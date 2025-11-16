import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateCampaignStatusDto } from './dto/update-campaign-status.dto';
import { CampaignStatus } from '@prisma/client';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(dto: CreateCampaignDto, createdBy: string, imageFile?: Express.Multer.File) {
    // Validate dates
    const startDate = new Date(dto.start_date);
    const endDate = new Date(dto.end_date);

    if (endDate <= startDate) {
      throw new BadRequestException('End date must be after start date');
    }

    // Note: No need to check for existing ACTIVE/UPCOMING campaigns here
    // because new campaigns are created with PENDING status by default.
    // The validation is enforced when updating status to ACTIVE or UPCOMING.

    // Validate image BEFORE creating campaign
    if (imageFile) {
      // Validate file type
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedMimeTypes.includes(imageFile.mimetype)) {
        throw new BadRequestException(
          'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
        );
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        throw new BadRequestException('File size must be less than 5MB');
      }
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

    // Upload image if provided (validation already done)
    if (imageFile) {
      const uploadResult = await this.uploadsService.uploadCampaignImage(
        imageFile,
        campaign.campaign_id,
      );
      return this.formatCampaignResponse(uploadResult.campaign);
    }

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

    // If changing to ACTIVE, UPCOMING or FINISHED, check if there's already one with the SAME status
    // Business Rule: Only 1 ACTIVE, 1 UPCOMING and 1 FINISHED campaign allowed at a time
    if (dto.status === CampaignStatus.ACTIVE || dto.status === CampaignStatus.UPCOMING || dto.status === CampaignStatus.FINISHED) {
      const existingCampaignWithSameStatus = await this.prisma.campaign.findFirst({
        where: {
          campaign_id: { not: id }, // Exclude current campaign
          status: dto.status, // Check for the SAME status only
        },
      });

      if (existingCampaignWithSameStatus) {
        throw new ConflictException(
          `Cannot set campaign to ${dto.status}. There is already a ${dto.status} campaign: "${existingCampaignWithSameStatus.name}". Only one ${dto.status} campaign is allowed at a time.`,
        );
      }
    }

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
