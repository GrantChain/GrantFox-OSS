import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProjectStatus, ReviewAction } from '@prisma/client';
import {
  ProjectApprovedEvent,
  ProjectRejectedEvent,
} from '../notifications/events';

@Injectable()
export class ProjectReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createReview(
    projectId: string,
    dto: CreateReviewDto,
    adminId: string,
  ) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verificar que el proyecto está en PENDING
    if (project.status !== ProjectStatus.PENDING) {
      throw new BadRequestException(
        `Project must be in PENDING status to be reviewed. Current status: ${project.status}`,
      );
    }

    // Verificar que el admin existe y tiene rol ADMIN
    const admin = await this.prisma.user.findUnique({
      where: { user_id: adminId },
    });

    if (!admin || !admin.roles.includes('ADMIN')) {
      throw new ForbiddenException('Only ADMIN users can review projects');
    }

    // Mapear ReviewAction a ProjectStatus
    let newStatus: ProjectStatus;
    switch (dto.action) {
      case ReviewAction.APPROVED:
        newStatus = ProjectStatus.APPROVED;
        break;
      case ReviewAction.REJECTED:
        newStatus = ProjectStatus.REJECTED; // Rechazo definitivo
        break;
      case ReviewAction.CHANGES_REQUESTED:
        newStatus = ProjectStatus.CHANGES_REQUESTED; // Puede resubmitir
        break;
      default:
        throw new BadRequestException(`Invalid review action: ${dto.action}`);
    }

    // Obtener maintainers del proyecto para notificar
    const maintainers = await this.prisma.projectMaintainer.findMany({
      where: {
        project_id: projectId,
        is_active: true,
      },
      select: {
        maintainer_id: true,
      },
    });

    const maintainerIds = maintainers.map((m) => m.maintainer_id);

    // Crear review y actualizar proyecto en transacción
    const result = await this.prisma.$transaction(async (tx) => {
      // Crear review
      const review = await tx.projectReview.create({
        data: {
          project_id: projectId,
          admin_id: adminId,
          action: dto.action,
          reason: dto.reason,
        },
        include: {
          admin: {
            select: {
              user_id: true,
              email: true,
              username: true,
            },
          },
          project: {
            select: {
              project_id: true,
              name: true,
              status: true,
            },
          },
        },
      });

      // Actualizar proyecto
      await tx.project.update({
        where: { project_id: projectId },
        data: {
          status: newStatus,
          reviewed_at: new Date(),
        },
      });

      return review;
    });

    // Emitir eventos según la acción de review
    if (dto.action === ReviewAction.APPROVED) {
      this.eventEmitter.emit(
        'project.approved',
        new ProjectApprovedEvent(projectId, project.name, maintainerIds),
      );
    } else if (dto.action === ReviewAction.REJECTED) {
      this.eventEmitter.emit(
        'project.rejected',
        new ProjectRejectedEvent(
          projectId,
          project.name,
          maintainerIds,
          dto.reason,
        ),
      );
    }

    return result;
  }

  async getReviewsByProject(projectId: string) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Obtener todas las reviews del proyecto
    const reviews = await this.prisma.projectReview.findMany({
      where: { project_id: projectId },
      include: {
        admin: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return reviews;
  }

  async getLatestReview(projectId: string) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Obtener la review más reciente
    const review = await this.prisma.projectReview.findFirst({
      where: { project_id: projectId },
      include: {
        admin: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!review) {
      throw new NotFoundException(
        `No reviews found for project ${projectId}`,
      );
    }

    return review;
  }

  async resubmitProject(projectId: string, userId: string) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verificar el status actual del proyecto
    if (project.status === ProjectStatus.APPROVED) {
      throw new BadRequestException(
        'This project is already approved. No resubmission needed.',
      );
    }

    if (project.status === ProjectStatus.PENDING) {
      throw new BadRequestException(
        'This project is already pending review. Please wait for admin feedback.',
      );
    }

    if (project.status === ProjectStatus.REJECTED) {
      throw new BadRequestException(
        'This project has been permanently rejected. Please create a new project instead.',
      );
    }

    if (project.status !== ProjectStatus.CHANGES_REQUESTED) {
      throw new BadRequestException(
        `Cannot resubmit project with status: ${project.status}`,
      );
    }

    // Verificar que el usuario es owner del proyecto
    const maintainer = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: userId,
        },
      },
    });

    if (!maintainer || !maintainer.is_owner || !maintainer.is_active) {
      throw new ForbiddenException(
        'Only project owners can resubmit projects',
      );
    }

    // Reenviar proyecto: cambiar a PENDING y aumentar contador
    const updatedProject = await this.prisma.project.update({
      where: { project_id: projectId },
      data: {
        status: ProjectStatus.PENDING,
        reviewed_at: null,
        resubmission_count: {
          increment: 1,
        },
      },
      include: {
        reviews: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    return {
      message: 'Project resubmitted successfully',
      project_id: projectId,
      new_status: updatedProject.status,
      resubmission_count: updatedProject.resubmission_count,
      previous_review: updatedProject.reviews[0] || null,
    };
  }

  async getReviewStats() {
    // Estadísticas generales de reviews
    const totalReviews = await this.prisma.projectReview.count();
    const approvedCount = await this.prisma.projectReview.count({
      where: { action: ReviewAction.APPROVED },
    });
    const rejectedCount = await this.prisma.projectReview.count({
      where: { action: ReviewAction.REJECTED },
    });
    const changesRequestedCount = await this.prisma.projectReview.count({
      where: { action: ReviewAction.CHANGES_REQUESTED },
    });

    const pendingProjects = await this.prisma.project.count({
      where: { status: ProjectStatus.PENDING },
    });

    return {
      total_reviews: totalReviews,
      approved: approvedCount,
      rejected: rejectedCount,
      changes_requested: changesRequestedCount,
      pending_projects: pendingProjects,
    };
  }
}
