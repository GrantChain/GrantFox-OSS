import {
  Injectable,
  NotFoundException,
  ConflictException,
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

    // Check if escrow_id already exists
    const existingEscrow = await this.prisma.escrow.findUnique({
      where: { escrow_id: dto.escrow_id },
    });

    if (existingEscrow) {
      throw new ConflictException(
        `Escrow with ID ${dto.escrow_id} already exists`,
      );
    }

    // Create escrow
    const escrow = await this.prisma.escrow.create({
      data: {
        escrow_id: dto.escrow_id,
        escrow_type: dto.escrow_type,
        campaign_id: dto.campaign_id,
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
      },
    });

    return this.formatEscrowResponse(updatedEscrow);
  }

  /**
   * Format escrow response with campaign and repositories
   */
  private formatEscrowResponse(escrow: any) {
    return {
      escrow_id: escrow.escrow_id,
      escrow_type: escrow.escrow_type,
      campaign_id: escrow.campaign_id,
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
    };
  }
}
