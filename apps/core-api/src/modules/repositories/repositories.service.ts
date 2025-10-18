import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AddRepositoryDto } from './dto/add-repository.dto';

@Injectable()
export class RepositoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async addToProject(projectId: string, dto: AddRepositoryDto, userId: string) {
    // Verificar que el proyecto existe
    const project = await this.prisma.project.findUnique({
      where: { project_id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(projectId, userId);

    // Verificar si el repositorio ya existe
    const existingRepo = await this.prisma.repository.findUnique({
      where: { github_repo_id: dto.github_repo_id },
    });

    if (existingRepo) {
      // Si existe pero está inactivo, reactivarlo
      if (!existingRepo.is_active) {
        const reactivated = await this.prisma.repository.update({
          where: { github_repo_id: dto.github_repo_id },
          data: { is_active: true },
        });
        return reactivated;
      }

      // Si existe y está activo, error
      throw new ConflictException(
        `Repository ${dto.github_repo_id} is already registered`,
      );
    }

    // Crear nuevo repositorio
    const repository = await this.prisma.repository.create({
      data: {
        github_repo_id: dto.github_repo_id,
        project_id: projectId,
        github_url: dto.github_url,
        name: dto.name,
        description: dto.description,
      },
    });

    return repository;
  }

  async findByProject(projectId: string, includeInactive = false) {
    const repositories = await this.prisma.repository.findMany({
      where: {
        project_id: projectId,
        is_active: includeInactive ? undefined : true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return repositories;
  }

  async findOne(repoId: number) {
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
      include: {
        project: {
          select: {
            project_id: true,
            name: true,
            github_handle: true,
          },
        },
      },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    return repository;
  }

  async deactivate(repoId: number, userId: string) {
    // Buscar el repositorio
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(repository.project_id, userId);

    // Soft delete: marcar como inactivo
    const updated = await this.prisma.repository.update({
      where: { github_repo_id: repoId },
      data: { is_active: false },
    });

    return updated;
  }

  async reactivate(repoId: number, userId: string) {
    // Buscar el repositorio
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    // Verificar que el usuario es owner del proyecto
    await this.verifyOwnership(repository.project_id, userId);

    // Reactivar
    const updated = await this.prisma.repository.update({
      where: { github_repo_id: repoId },
      data: { is_active: true },
    });

    return updated;
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
      throw new ForbiddenException('Only project owners can manage repositories');
    }
  }
}
