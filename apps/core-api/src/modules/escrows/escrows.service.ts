import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateEscrowDto } from './dto/create-escrow.dto';
import { UpdateEscrowDto } from './dto/update-escrow.dto';

@Injectable()
export class EscrowsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new escrow
   */
  async create(dto: CreateEscrowDto, createdBy: string) {
    // Verify campaign exists
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: dto.campaign_id },
    });

    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID ${dto.campaign_id} not found`,
      );
    }

    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { project_id: dto.project_id },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${dto.project_id} not found`,
      );
    }

    // Verify that the project belongs to the campaign
    // Check if any repository of this project is part of the campaign
    const projectInCampaign = await this.prisma.campaignRepository.findFirst({
      where: {
        campaign_id: dto.campaign_id,
        repository: {
          project_id: dto.project_id,
        },
      },
    });

    if (!projectInCampaign) {
      throw new BadRequestException(
        `Project ${dto.project_id} is not part of campaign ${dto.campaign_id}`,
      );
    }

    // Check if escrow_id already exists
    const existingEscrowById = await this.prisma.escrow.findUnique({
      where: { escrow_id: dto.escrow_id },
    });

    if (existingEscrowById) {
      throw new ConflictException(
        `Escrow with ID ${dto.escrow_id} already exists`,
      );
    }

    // Check if an escrow already exists for this campaign + project combination
    const existingEscrow = await this.prisma.escrow.findUnique({
      where: {
        campaign_id_project_id: {
          campaign_id: dto.campaign_id,
          project_id: dto.project_id,
        },
      },
    });

    if (existingEscrow) {
      throw new ConflictException(
        `An escrow already exists for campaign ${dto.campaign_id} and project ${dto.project_id}`,
      );
    }

    // Create escrow
    const escrow = await this.prisma.escrow.create({
      data: {
        escrow_id: dto.escrow_id,
        escrow_type: dto.escrow_type,
        campaign_id: dto.campaign_id,
        project_id: dto.project_id,
        created_by: createdBy,
      },
      include: {
        campaign: {
          include: {
            repositories: {
              include: {
                repository: true,
              },
            },
          },
        },
        project: true,
      },
    });

    return this.formatEscrowResponse(escrow);
  }

  /**
   * Get all escrows
   */
  async findAll() {
    const escrows = await this.prisma.escrow.findMany({
      include: {
        campaign: {
          include: {
            repositories: {
              include: {
                repository: true,
              },
            },
          },
        },
        project: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return escrows.map((escrow) => this.formatEscrowResponse(escrow));
  }

  /**
   * Get escrow by ID
   */
  async findOne(escrowId: string) {
    const escrow = await this.prisma.escrow.findUnique({
      where: { escrow_id: escrowId },
      include: {
        campaign: {
          include: {
            repositories: {
              include: {
                repository: true,
              },
            },
          },
        },
        project: true,
      },
    });

    if (!escrow) {
      throw new NotFoundException(`Escrow with ID ${escrowId} not found`);
    }

    return this.formatEscrowResponse(escrow);
  }

  /**
   * Get escrows by campaign ID
   */
  async findByCampaign(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID ${campaignId} not found`,
      );
    }

    const escrows = await this.prisma.escrow.findMany({
      where: { campaign_id: campaignId },
      include: {
        campaign: {
          include: {
            repositories: {
              include: {
                repository: true,
              },
            },
          },
        },
        project: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return escrows.map((escrow) => this.formatEscrowResponse(escrow));
  }

  /**
   * Update escrow
   */
  async update(escrowId: string, dto: UpdateEscrowDto) {
    const escrow = await this.prisma.escrow.findUnique({
      where: { escrow_id: escrowId },
    });

    if (!escrow) {
      throw new NotFoundException(`Escrow with ID ${escrowId} not found`);
    }

    const updatedEscrow = await this.prisma.escrow.update({
      where: { escrow_id: escrowId },
      data: dto,
      include: {
        campaign: {
          include: {
            repositories: {
              include: {
                repository: true,
              },
            },
          },
        },
        project: true,
      },
    });

    return this.formatEscrowResponse(updatedEscrow);
  }

  /**
   * Check if an escrow exists for a campaign and project
   */
  async checkEscrowExists(campaignId: string, projectId: string) {
    const escrow = await this.prisma.escrow.findUnique({
      where: {
        campaign_id_project_id: {
          campaign_id: campaignId,
          project_id: projectId,
        },
      },
    });

    return {
      exists: !!escrow,
      escrow_id: escrow?.escrow_id,
      message: escrow
        ? `An escrow already exists for this campaign and project`
        : `No escrow exists for this campaign and project`,
    };
  }

  /**
   * Format escrow response with campaign, project and repositories
   */
  private formatEscrowResponse(escrow: any) {
    return {
      escrow_id: escrow.escrow_id,
      escrow_type: escrow.escrow_type,
      campaign_id: escrow.campaign_id,
      project_id: escrow.project_id,
      created_by: escrow.created_by,
      created_at: escrow.created_at,
      updated_at: escrow.updated_at,
      campaign: escrow.campaign
        ? {
            campaign_id: escrow.campaign.campaign_id,
            name: escrow.campaign.name,
            description: escrow.campaign.description,
            status: escrow.campaign.status,
            repositories: escrow.campaign.repositories?.map((cr: any) => ({
              repository_id: cr.repository.github_repo_id,
              name: cr.repository.name,
              github_url: cr.repository.github_url,
              description: cr.repository.description,
            })),
          }
        : undefined,
      project: escrow.project
        ? {
            project_id: escrow.project.project_id,
            name: escrow.project.name,
            github_handle: escrow.project.github_handle,
            short_description: escrow.project.short_description,
            status: escrow.project.status,
          }
        : undefined,
    };
  }
}
