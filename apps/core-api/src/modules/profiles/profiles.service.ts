import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateMaintainerProfileDto,
  UpdateMaintainerProfileDto,
  CreateContributorProfileDto,
  UpdateContributorProfileDto,
  CreateAdminProfileDto,
} from './dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  // =============================================
  // MAINTAINER PROFILE
  // =============================================

  /**
   * Create a maintainer profile
   */
  async createMaintainerProfile(dto: CreateMaintainerProfileDto) {
    // Verify user exists and has MAINTAINER role
    const user = await this.prisma.user.findUnique({
      where: { user_id: dto.user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(UserRole.MAINTAINER)) {
      throw new BadRequestException(
        'User must have MAINTAINER role to create this profile',
      );
    }

    // Check if profile already exists
    const existingProfile = await this.prisma.maintainerProfile.findUnique({
      where: { user_id: dto.user_id },
    });

    if (existingProfile) {
      throw new ConflictException('Maintainer profile already exists');
    }

    return await this.prisma.maintainerProfile.create({
      data: {
        user_id: dto.user_id,
        bio: dto.bio,
        social_media: dto.social_media,
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Get maintainer profile by user_id
   */
  async getMaintainerProfile(userId: string) {
    const profile = await this.prisma.maintainerProfile.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
            is_active: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Maintainer profile not found');
    }

    return profile;
  }

  /**
   * Update maintainer profile
   */
  async updateMaintainerProfile(
    userId: string,
    dto: UpdateMaintainerProfileDto,
  ) {
    const profile = await this.prisma.maintainerProfile.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      throw new NotFoundException('Maintainer profile not found');
    }

    return await this.prisma.maintainerProfile.update({
      where: { user_id: userId },
      data: dto,
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Get all maintainer profiles
   */
  async getAllMaintainerProfiles() {
    return await this.prisma.maintainerProfile.findMany({
      where: {
        user: {
          is_active: true,
        },
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // =============================================
  // CONTRIBUTOR PROFILE
  // =============================================

  /**
   * Create a contributor profile
   */
  async createContributorProfile(dto: CreateContributorProfileDto) {
    // Verify user exists and has CONTRIBUTOR role
    const user = await this.prisma.user.findUnique({
      where: { user_id: dto.user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(UserRole.CONTRIBUTOR)) {
      throw new BadRequestException(
        'User must have CONTRIBUTOR role to create this profile',
      );
    }

    // Check if profile already exists
    const existingProfile = await this.prisma.contributorProfile.findUnique({
      where: { user_id: dto.user_id },
    });

    if (existingProfile) {
      throw new ConflictException('Contributor profile already exists');
    }

    return await this.prisma.contributorProfile.create({
      data: {
        user_id: dto.user_id,
        skills: dto.skills || [],
        bio: dto.bio,
        portfolio_url: dto.portfolio_url,
        social_media: dto.social_media,
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Get contributor profile by user_id
   */
  async getContributorProfile(userId: string) {
    const profile = await this.prisma.contributorProfile.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
            is_active: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Contributor profile not found');
    }

    return profile;
  }

  /**
   * Update contributor profile
   */
  async updateContributorProfile(
    userId: string,
    dto: UpdateContributorProfileDto,
  ) {
    const profile = await this.prisma.contributorProfile.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      throw new NotFoundException('Contributor profile not found');
    }

    return await this.prisma.contributorProfile.update({
      where: { user_id: userId },
      data: dto,
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Get all contributor profiles
   */
  async getAllContributorProfiles() {
    return await this.prisma.contributorProfile.findMany({
      where: {
        user: {
          is_active: true,
        },
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Search contributors by skills
   */
  async searchContributorsBySkills(skills: string[]) {
    return await this.prisma.contributorProfile.findMany({
      where: {
        skills: {
          hasSome: skills,
        },
        user: {
          is_active: true,
        },
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // =============================================
  // ADMIN PROFILE
  // =============================================

  /**
   * Create an admin profile
   */
  async createAdminProfile(dto: CreateAdminProfileDto) {
    // Verify user exists and has ADMIN role
    const user = await this.prisma.user.findUnique({
      where: { user_id: dto.user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(UserRole.ADMIN)) {
      throw new BadRequestException(
        'User must have ADMIN role to create this profile',
      );
    }

    // Check if profile already exists
    const existingProfile = await this.prisma.adminProfile.findUnique({
      where: { user_id: dto.user_id },
    });

    if (existingProfile) {
      throw new ConflictException('Admin profile already exists');
    }

    return await this.prisma.adminProfile.create({
      data: {
        user_id: dto.user_id,
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Get admin profile by user_id
   */
  async getAdminProfile(userId: string) {
    const profile = await this.prisma.adminProfile.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
            is_active: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Admin profile not found');
    }

    return profile;
  }

  /**
   * Get all admin profiles
   */
  async getAllAdminProfiles() {
    return await this.prisma.adminProfile.findMany({
      where: {
        user: {
          is_active: true,
        },
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            username: true,
            avatar_url: true,
            roles: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
