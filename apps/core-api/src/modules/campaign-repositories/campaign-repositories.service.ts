import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AddRepositoriesToCampaignDto } from './dto/add-repositories-to-campaign.dto';
import { CampaignStatus, ProjectStatus } from '@prisma/client';

@Injectable()
export class CampaignRepositoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async addRepositoriesToCampaign(
    campaignId: string,
    dto: AddRepositoriesToCampaignDto,
    userId: string,
  ) {
    // Verificar que la campaña existe y está ACTIVE
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new BadRequestException(
        `Campaign must be ACTIVE to add repositories. Current status: ${campaign.status}`,
      );
    }

    const results: any[] = [];
    const errors: any[] = [];

    for (const repoId of dto.repository_ids) {
      try {
        // Verificar que el repo existe y está activo
        const repository = await this.prisma.repository.findUnique({
          where: { github_repo_id: repoId },
          include: {
            project: {
              include: {
                maintainers: {
                  where: {
                    maintainer_id: userId,
                    is_active: true,
                  },
                },
              },
            },
          },
        });

        if (!repository) {
          errors.push({
            repository_id: repoId,
            error: 'Repository not found',
          });
          continue;
        }

        if (!repository.is_active) {
          errors.push({
            repository_id: repoId,
            error: 'Repository is not active',
          });
          continue;
        }

        // Verificar que el proyecto está APPROVED
        if (repository.project.status !== ProjectStatus.APPROVED) {
          errors.push({
            repository_id: repoId,
            error: `Project must be APPROVED. Current status: ${repository.project.status}`,
          });
          continue;
        }

        // Verificar que el usuario es maintainer del proyecto
        if (repository.project.maintainers.length === 0) {
          errors.push({
            repository_id: repoId,
            error: 'You are not a maintainer of this project',
          });
          continue;
        }

        // Verificar que el repo no esté ya en esta campaña
        const existingInCampaign = await this.prisma.campaignRepository.findUnique({
          where: {
            campaign_id_repository_id: {
              campaign_id: campaignId,
              repository_id: repoId,
            },
          },
        });

        if (existingInCampaign) {
          errors.push({
            repository_id: repoId,
            error: 'Repository is already in this campaign',
          });
          continue;
        }

        // Verificar que el repo no esté en otra campaña ACTIVE
        const existingActiveCampaign = await this.prisma.campaignRepository.findFirst({
          where: {
            repository_id: repoId,
            campaign: {
              status: CampaignStatus.ACTIVE,
            },
          },
          include: {
            campaign: {
              select: {
                campaign_id: true,
                name: true,
              },
            },
          },
        });

        if (existingActiveCampaign) {
          errors.push({
            repository_id: repoId,
            error: `Repository is already in active campaign: ${existingActiveCampaign.campaign.name}`,
          });
          continue;
        }

        // Agregar repo a la campaña
        const campaignRepo = await this.prisma.campaignRepository.create({
          data: {
            campaign_id: campaignId,
            repository_id: repoId,
          },
          include: {
            repository: {
              select: {
                github_repo_id: true,
                name: true,
                github_url: true,
                project_id: true,
              },
            },
          },
        });

        results.push(campaignRepo);
      } catch (error) {
        errors.push({
          repository_id: repoId,
          error: error.message || 'Unknown error',
        });
      }
    }

    return {
      message: `Added ${results.length} repositories to campaign`,
      added: results,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async getRepositoriesByCampaign(campaignId: string) {
    // Verificar que la campaña existe
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    // Obtener repos activos de la campaña
    const campaignRepos = await this.prisma.campaignRepository.findMany({
      where: {
        campaign_id: campaignId,
        repository: {
          is_active: true,
          project: {
            status: ProjectStatus.APPROVED,
          },
        },
      },
      include: {
        repository: {
          include: {
            project: {
              select: {
                project_id: true,
                name: true,
                github_handle: true,
                short_description: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return campaignRepos.map((cr) => ({
      campaign_id: cr.campaign_id,
      repository_id: cr.repository_id,
      added_at: cr.created_at,
      repository: {
        github_repo_id: cr.repository.github_repo_id,
        name: cr.repository.name,
        github_url: cr.repository.github_url,
        description: cr.repository.description,
        project: cr.repository.project,
      },
    }));
  }

  async getCampaignsByRepository(repoId: number) {
    // Verificar que el repo existe
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    // Obtener todas las campañas (historial completo)
    const campaignRepos = await this.prisma.campaignRepository.findMany({
      where: {
        repository_id: repoId,
      },
      include: {
        campaign: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return campaignRepos.map((cr) => ({
      campaign_id: cr.campaign_id,
      repository_id: cr.repository_id,
      joined_at: cr.created_at,
      campaign: {
        campaign_id: cr.campaign.campaign_id,
        name: cr.campaign.name,
        description: cr.campaign.description,
        status: cr.campaign.status,
        start_date: cr.campaign.start_date,
        end_date: cr.campaign.end_date,
        image_url: cr.campaign.image_url,
      },
    }));
  }

  async removeRepositoryFromCampaign(
    campaignId: string,
    repoId: number,
    userId: string,
  ) {
    // Verificar que la relación existe
    const campaignRepo = await this.prisma.campaignRepository.findUnique({
      where: {
        campaign_id_repository_id: {
          campaign_id: campaignId,
          repository_id: repoId,
        },
      },
      include: {
        repository: {
          include: {
            project: {
              include: {
                maintainers: {
                  where: {
                    maintainer_id: userId,
                    is_active: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!campaignRepo) {
      throw new NotFoundException(
        `Repository ${repoId} is not in campaign ${campaignId}`,
      );
    }

    // Verificar que el usuario es maintainer del proyecto
    if (campaignRepo.repository.project.maintainers.length === 0) {
      throw new ForbiddenException(
        'Only project maintainers can remove repositories from campaigns',
      );
    }

    // Eliminar la relación
    await this.prisma.campaignRepository.delete({
      where: {
        campaign_id_repository_id: {
          campaign_id: campaignId,
          repository_id: repoId,
        },
      },
    });

    return {
      message: 'Repository removed from campaign successfully',
      campaign_id: campaignId,
      repository_id: repoId,
    };
  }

  async checkRepositoryInCampaign(campaignId: string, repoId: number) {
    const campaignRepo = await this.prisma.campaignRepository.findUnique({
      where: {
        campaign_id_repository_id: {
          campaign_id: campaignId,
          repository_id: repoId,
        },
      },
    });

    return {
      in_campaign: !!campaignRepo,
      campaign_id: campaignId,
      repository_id: repoId,
    };
  }

  async getActiveCampaignForRepository(repoId: number) {
    // Verificar que el repo existe
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    // Buscar campaña activa
    const activeCampaign = await this.prisma.campaignRepository.findFirst({
      where: {
        repository_id: repoId,
        campaign: {
          status: CampaignStatus.ACTIVE,
        },
      },
      include: {
        campaign: true,
      },
    });

    if (!activeCampaign) {
      return {
        has_active_campaign: false,
        repository_id: repoId,
      };
    }

    return {
      has_active_campaign: true,
      repository_id: repoId,
      campaign: {
        campaign_id: activeCampaign.campaign.campaign_id,
        name: activeCampaign.campaign.name,
        description: activeCampaign.campaign.description,
        start_date: activeCampaign.campaign.start_date,
        end_date: activeCampaign.campaign.end_date,
      },
    };
  }
}
