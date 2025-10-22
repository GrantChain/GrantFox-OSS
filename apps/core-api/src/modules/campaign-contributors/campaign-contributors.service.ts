import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CampaignContributorsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Register contributor to campaign
   */
  async register(campaignId: string, contributorId: string) {
    // Verify campaign exists
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID ${campaignId} not found`,
      );
    }

    // Only allow registration to ACTIVE campaigns
    if (campaign.status !== 'ACTIVE') {
      throw new BadRequestException(
        `Cannot register to campaign with status ${campaign.status}. Only ACTIVE campaigns allow registration.`,
      );
    }

    // Verify user exists and is a CONTRIBUTOR
    const user = await this.prisma.user.findUnique({
      where: { user_id: contributorId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${contributorId} not found`);
    }

    if (!user.roles.includes('CONTRIBUTOR')) {
      throw new BadRequestException(
        'Only users with CONTRIBUTOR role can register to campaigns',
      );
    }

    // Check if already registered
    const existingRegistration =
      await this.prisma.campaignContributor.findUnique({
        where: {
          campaign_id_contributor_id: {
            campaign_id: campaignId,
            contributor_id: contributorId,
          },
        },
      });

    if (existingRegistration) {
      throw new ConflictException(
        'You are already registered to this campaign',
      );
    }

    // Create registration
    const registration = await this.prisma.campaignContributor.create({
      data: {
        campaign_id: campaignId,
        contributor_id: contributorId,
      },
      include: {
        campaign: {
          select: {
            campaign_id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    return registration;
  }

  /**
   * Get all contributors for a campaign
   */
  async getContributorsByCampaign(campaignId: string) {
    // Verify campaign exists
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
      select: {
        campaign_id: true,
        name: true,
        status: true,
      },
    });

    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID ${campaignId} not found`,
      );
    }

    const contributors = await this.prisma.campaignContributor.findMany({
      where: { campaign_id: campaignId },
      include: {
        contributor: {
          select: {
            user_id: true,
            username: true,
            email: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    });

    return {
      campaign,
      contributors: contributors.map((c) => ({
        contributor_id: c.contributor_id,
        username: c.contributor.username,
        email: c.contributor.email,
        avatar_url: c.contributor.avatar_url,
        registered_at: c.registered_at,
      })),
      total: contributors.length,
    };
  }

  /**
   * Get all campaigns a contributor is registered to
   */
  async getCampaignsByContributor(contributorId: string) {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { user_id: contributorId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${contributorId} not found`);
    }

    const registrations = await this.prisma.campaignContributor.findMany({
      where: { contributor_id: contributorId },
      include: {
        campaign: {
          select: {
            campaign_id: true,
            name: true,
            description: true,
            status: true,
            start_date: true,
            end_date: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
    });

    return registrations.map((r) => ({
      ...r.campaign,
      registered_at: r.registered_at,
    }));
  }
}
