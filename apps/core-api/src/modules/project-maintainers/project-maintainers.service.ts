import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectMaintainersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjectsByMaintainer(userId: string) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Obtener todos los proyectos donde el usuario es maintainer activo
    const projectMaintainers = await this.prisma.projectMaintainer.findMany({
      where: {
        maintainer_id: userId,
        is_active: true,
      },
      include: {
        project: {
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
            repositories: {
              where: { is_active: true },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return projectMaintainers.map((pm) => ({
      id: pm.id,
      is_owner: pm.is_owner,
      joined_at: pm.created_at,
      project: {
        project_id: pm.project.project_id,
        name: pm.project.name,
        github_handle: pm.project.github_handle,
        short_description: pm.project.short_description,
        description: pm.project.description,
        tech_stack: pm.project.tech_stack,
        category: pm.project.category,
        status: pm.project.status,
        created_at: pm.project.created_at,
        maintainers: pm.project.maintainers.map((m) => ({
          user_id: m.maintainer.user_id,
          email: m.maintainer.email,
          username: m.maintainer.username,
          avatar_url: m.maintainer.avatar_url,
          is_owner: m.is_owner,
        })),
        repositories: pm.project.repositories.map((r) => ({
          github_repo_id: r.github_repo_id,
          name: r.name,
          github_url: r.github_url,
        })),
      },
    }));
  }

  async getMaintainersByProject(projectId: string) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Obtener todos los maintainers activos del proyecto
    const maintainers = await this.prisma.projectMaintainer.findMany({
      where: {
        project_id: projectId,
        is_active: true,
      },
      include: {
        maintainer: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
            created_at: true,
          },
        },
      },
      orderBy: [{ is_owner: 'desc' }, { created_at: 'asc' }],
    });

    return maintainers.map((pm) => ({
      id: pm.id,
      is_owner: pm.is_owner,
      joined_at: pm.created_at,
      maintainer: {
        user_id: pm.maintainer.user_id,
        email: pm.maintainer.email,
        username: pm.maintainer.username,
        avatar_url: pm.maintainer.avatar_url,
        roles: pm.maintainer.roles,
        member_since: pm.maintainer.created_at,
      },
    }));
  }

  async transferOwnership(
    projectId: string,
    dto: TransferOwnershipDto,
    currentUserId: string,
  ) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verificar que el usuario actual es owner
    const currentOwner = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: currentUserId,
        },
      },
    });

    if (!currentOwner || !currentOwner.is_owner || !currentOwner.is_active) {
      throw new ForbiddenException('Only project owners can transfer ownership');
    }

    // Verificar que el nuevo owner existe y es maintainer del proyecto
    const newOwner = await this.prisma.projectMaintainer.findUnique({
      where: {
        project_id_maintainer_id: {
          project_id: projectId,
          maintainer_id: dto.new_owner_id,
        },
      },
    });

    if (!newOwner) {
      throw new NotFoundException(
        `User ${dto.new_owner_id} is not a maintainer of this project`,
      );
    }

    if (!newOwner.is_active) {
      throw new BadRequestException(
        'Cannot transfer ownership to an inactive maintainer',
      );
    }

    // Transferir ownership: quitar a todos y dar al nuevo
    await this.prisma.$transaction([
      // Quitar ownership a todos
      this.prisma.projectMaintainer.updateMany({
        where: { project_id: projectId },
        data: { is_owner: false },
      }),
      // Dar ownership al nuevo owner
      this.prisma.projectMaintainer.update({
        where: {
          project_id_maintainer_id: {
            project_id: projectId,
            maintainer_id: dto.new_owner_id,
          },
        },
        data: { is_owner: true },
      }),
    ]);

    return {
      message: 'Ownership transferred successfully',
      previous_owner_id: currentUserId,
      new_owner_id: dto.new_owner_id,
      project_id: projectId,
    };
  }

  async getMaintainerStats(userId: string) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Obtener todos los proyectos del maintainer
    const projectMaintainers = await this.prisma.projectMaintainer.findMany({
      where: {
        maintainer_id: userId,
        is_active: true,
      },
      include: {
        project: {
          select: {
            status: true,
          },
        },
      },
    });

    const totalProjects = projectMaintainers.length;
    const ownedProjects = projectMaintainers.filter((pm) => pm.is_owner).length;
    const activeProjects = projectMaintainers.filter(
      (pm) => pm.project.status === ProjectStatus.APPROVED,
    ).length;
    const pendingProjects = projectMaintainers.filter(
      (pm) => pm.project.status === ProjectStatus.PENDING,
    ).length;
    const approvedProjects = activeProjects;

    return {
      total_projects: totalProjects,
      owned_projects: ownedProjects,
      active_projects: activeProjects,
      pending_projects: pendingProjects,
      approved_projects: approvedProjects,
    };
  }
}
