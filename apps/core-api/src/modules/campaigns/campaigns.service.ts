import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateCampaignStatusDto } from './dto/update-campaign-status.dto';
import { CampaignStatus } from '@prisma/client';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCampaignDto, createdBy: string) {
    // Validate dates
    const startDate = new Date(dto.start_date);
    const endDate = new Date(dto.end_date);

    if (endDate <= startDate) {
      throw new BadRequestException('End date must be after start date');
    }

    // Create campaign without repositories (maintainers will add them later)
    const campaign = await this.prisma.campaign.create({
      data: {
        name: dto.name,
        description: dto.description,
        tags: dto.tags,
        start_date: startDate,
        end_date: endDate,
        image_url: dto.image_url,
        created_by: createdBy,
      },
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
    });

    return this.formatCampaignResponse(campaign);
  }

  async findAll(status?: CampaignStatus) {
    const campaigns = await this.prisma.campaign.findMany({
      where: status ? { status } : undefined,
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return campaigns.map((campaign) => this.formatCampaignResponse(campaign));
  }

  async findOne(id: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: id },
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return this.formatCampaignResponse(campaign);
  }

  async update(id: string, dto: UpdateCampaignDto) {
    // Check if campaign exists
    await this.findOne(id);

    // Validate dates if both are provided
    if (dto.start_date && dto.end_date) {
      const startDate = new Date(dto.start_date);
      const endDate = new Date(dto.end_date);

      if (endDate <= startDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    const campaign = await this.prisma.campaign.update({
      where: { campaign_id: id },
      data: {
        ...dto,
        start_date: dto.start_date ? new Date(dto.start_date) : undefined,
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
      },
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
    });

    return this.formatCampaignResponse(campaign);
  }

  async updateStatus(id: string, dto: UpdateCampaignStatusDto) {
    // Check if campaign exists
    await this.findOne(id);

    const campaign = await this.prisma.campaign.update({
      where: { campaign_id: id },
      data: { status: dto.status },
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
    });

    return this.formatCampaignResponse(campaign);
  }

  async remove(id: string) {
    // Check if campaign exists
    await this.findOne(id);

    // Soft delete: cambiar status a INACTIVE
    const campaign = await this.prisma.campaign.update({
      where: { campaign_id: id },
      data: { status: CampaignStatus.INACTIVE },
      include: {
        repositories: {
          include: {
            repository: true,
          },
        },
      },
    });

    return this.formatCampaignResponse(campaign);
  }

  private formatCampaignResponse(campaign: any) {
    return {
      campaign_id: campaign.campaign_id,
      name: campaign.name,
      description: campaign.description,
      tags: campaign.tags,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      status: campaign.status,
      image_url: campaign.image_url,
      created_by: campaign.created_by,
      created_at: campaign.created_at,
      updated_at: campaign.updated_at,
      repositories: campaign.repositories?.map((cr: any) => ({
        github_repo_id: cr.repository.github_repo_id,
        github_url: cr.repository.github_url,
        name: cr.repository.name,
        description: cr.repository.description,
      })),
    };
  }
}
