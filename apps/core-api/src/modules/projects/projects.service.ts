import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
import { AddMaintainerDto } from './dto/add-maintainer.dto';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto, createdBy: string) {
    // Verificar que el usuario existe y es MAINTAINER
    const user = await this.prisma.user.findUnique({
      where: { user_id: createdBy },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createdBy} not found`);
    }

    if (!user.roles.includes('MAINTAINER')) {
      throw new ForbiddenException('Only MAINTAINER users can create projects');
    }

    // Crear proyecto
    const project = await this.prisma.project.create({
      data: {
        ...dto,
        created_by: createdBy,
        status: ProjectStatus.PENDING,
      },
      include: {
        maintainers: {
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
              },
            },
          },
        },
        repositories: true,
      },
    });

    // Agregar al creador como maintainer owner
    await this.prisma.projectMaintainer.create({
      data: {
        project_id: project.project_id,
        maintainer_id: createdBy,
        is_owner: true,
      },
    });

    return this.findOne(project.project_id);
  }

  async findAll(status?: ProjectStatus) {
    const projects = await this.prisma.project.findMany({
      where: status ? { status } : undefined,
      include: {
        maintainers: {
          where: { is_active: true },
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return projects.map((project) => this.formatProjectResponse(project));
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { project_id: id },
      include: {
        maintainers: {
          where: { is_active: true },
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.formatProjectResponse(project);
  }

  async findByUser(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        maintainers: {
          some: {
            maintainer_id: userId,
            is_active: true,
          },
        },
      },
      include: {
        maintainers: {
          where: { is_active: true },
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return projects.map((project) => this.formatProjectResponse(project));
  }

  async update(id: string, dto: UpdateProjectDto, userId: string) {
    // Verificar que el proyecto existe
    await this.findOne(id);

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(id, userId);

    const project = await this.prisma.project.update({
      where: { project_id: id },
      data: dto,
      include: {
        maintainers: {
          where: { is_active: true },
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
    });

    return this.formatProjectResponse(project);
  }

  async updateStatus(id: string, dto: UpdateProjectStatusDto, userId: string) {
    // Verificar que el proyecto existe
    await this.findOne(id);

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(id, userId);

    const project = await this.prisma.project.update({
      where: { project_id: id },
      data: { status: dto.status },
      include: {
        maintainers: {
          where: { is_active: true },
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
    });

    return this.formatProjectResponse(project);
  }

  async remove(id: string, userId: string) {
    // Verificar que el proyecto existe
    await this.findOne(id);

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(id, userId);

    // Soft delete: desactivar todos los maintainers (incluyendo owners)
    await this.prisma.projectMaintainer.updateMany({
      where: { project_id: id },
      data: { is_active: false },
    });

    // Cambiar status a REJECTED (representa "eliminado" por el usuario)
    const project = await this.prisma.project.update({
      where: { project_id: id },
      data: { status: ProjectStatus.REJECTED },
      include: {
        maintainers: {
          include: {
            maintainer: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
        repositories: true,
      },
    });

    return this.formatProjectResponse(project);
  }

  async addMaintainer(projectId: string, dto: AddMaintainerDto, userId: string) {
    // Verificar que el proyecto existe
    await this.findOne(projectId);

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(projectId, userId);

    // Verificar que el maintainer existe y tiene rol MAINTAINER
    const maintainer = await this.prisma.user.findUnique({
      where: { user_id: dto.maintainer_id },
    });

    if (!maintainer) {
      throw new NotFoundException(`User with ID ${dto.maintainer_id} not found`);
    }

    if (!maintainer.roles.includes('MAINTAINER')) {
      throw new BadRequestException('User must have MAINTAINER role');
    }

    // Verificar que no esté ya agregado
    const existing = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: dto.maintainer_id,
        },
      },
    });

    if (existing) {
      if (!existing.is_active) {
        // Reactivar si estaba inactivo
        await this.prisma.projectMaintainer.update({
          where: {
            project_id_maintainer_id: {
              project_id: projectId,
              maintainer_id: dto.maintainer_id,
            },
          },
          data: { is_active: true },
        });
      } else {
        throw new ConflictException('Maintainer already added to this project');
      }
    } else {
      // Agregar nuevo maintainer
      await this.prisma.projectMaintainer.create({
        data: {
          project_id: projectId,
          maintainer_id: dto.maintainer_id,
          is_owner: dto.is_owner ?? false,
        },
      });
    }

    return this.findOne(projectId);
  }

  async removeMaintainer(projectId: string, maintainerId: string, userId: string) {
    // Verificar que el proyecto existe
    await this.findOne(projectId);

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(projectId, userId);

    // No permitir remover al último owner
    const owners = await this.prisma.projectMaintainer.count({
      where: {
        project_id: projectId,
        is_owner: true,
        is_active: true,
      },
    });

    const maintainerToRemove = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: maintainerId,
        },
      },
    });

    if (!maintainerToRemove) {
      throw new NotFoundException('Maintainer not found in this project');
    }

    if (maintainerToRemove.is_owner && owners <= 1) {
      throw new BadRequestException('Cannot remove the last owner of the project');
    }

    // Soft delete: marcar como inactivo
    await this.prisma.projectMaintainer.update({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: maintainerId,
        },
      },
      data: { is_active: false },
    });

    return this.findOne(projectId);
  }

  private async verifyOwnership(projectId: string, userId: string) {
    const maintainer = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: userId,
        },
      },
    });

    if (!maintainer || !maintainer.is_active || !maintainer.is_owner) {
      throw new ForbiddenException('Only project owners can perform this action');
    }
  }

  private formatProjectResponse(project: any) {
    return {
      project_id: project.project_id,
      name: project.name,
      github_handle: project.github_handle,
      short_description: project.short_description,
      description: project.description,
      tech_stack: project.tech_stack,
      category: project.category,
      status: project.status,
      created_by: project.created_by,
      created_at: project.created_at,
      updated_at: project.updated_at,
      reviewed_at: project.reviewed_at,
      maintainers: project.maintainers?.map((pm: any) => ({
        user_id: pm.maintainer.user_id,
        email: pm.maintainer.email,
        username: pm.maintainer.username,
        avatar_url: pm.maintainer.avatar_url,
        is_owner: pm.is_owner,
        joined_at: pm.created_at,
      })),
      repositories: project.repositories?.map((repo: any) => ({
        github_repo_id: repo.github_repo_id,
        github_url: repo.github_url,
        name: repo.name,
        description: repo.description,
      })),
    };
  }
}
