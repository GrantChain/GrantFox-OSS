import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
  ) {}

  /**
   * Create a new user with a specific role and optional avatar
   */
  async create(dto: CreateUserDto, avatarFile?: Express.Multer.File) {
    // Check if user_id already exists
    const existingUserId = await this.prisma.user.findUnique({
      where: { user_id: dto.user_id },
    });

    if (existingUserId) {
      throw new ConflictException('User with this ID already exists');
    }

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check username uniqueness if provided
    if (dto.username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });

      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    // Create user with initial role
    const user = await this.prisma.user.create({
      data: {
        user_id: dto.user_id,
        email: dto.email,
        username: dto.username,
        avatar_url: dto.avatar_url,
        roles: [dto.role],
      },
    });

    // Upload avatar if provided
    if (avatarFile) {
      const uploadResult = await this.uploadsService.uploadAvatar(
        avatarFile,
        user.user_id,
      );
      return uploadResult.user;
    }

    return user;
  }

  /**
   * Get all active users
   */
  async findAll(includeInactive = false) {
    return await this.prisma.user.findMany({
      where: includeInactive ? {} : { is_active: true },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Get user by ID
   */
  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        maintainer_profile: true,
        contributor_profile: true,
        admin_profile: true,
        wallets: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Get user by email
   */
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        maintainer_profile: true,
        contributor_profile: true,
        admin_profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Get user by username
   */
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update user basic information
   */
  async update(userId: string, dto: UpdateUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check username uniqueness if being updated
    if (dto.username && dto.username !== user.username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });

      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    return await this.prisma.user.update({
      where: { user_id: userId },
      data: dto,
    });
  }

  /**
   * Add a role to a user (doesn't overwrite existing roles)
   */
  async addRole(userId: string, dto: AddRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user already has this role
    if (user.roles.includes(dto.role)) {
      throw new BadRequestException('User already has this role');
    }

    // Add the new role to the existing roles array
    return await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        roles: {
          push: dto.role,
        },
      },
    });
  }

  /**
   * Remove a role from a user
   */
  async removeRole(userId: string, role: UserRole) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has this role
    if (!user.roles.includes(role)) {
      throw new BadRequestException('User does not have this role');
    }

    // Ensure user has at least one role
    if (user.roles.length === 1) {
      throw new BadRequestException('User must have at least one role');
    }

    // Remove the role from the array
    const updatedRoles = user.roles.filter((r) => r !== role);

    return await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        roles: updatedRoles,
      },
    });
  }

  /**
   * Soft delete user (set is_active to false)
   */
  async softDelete(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.is_active) {
      throw new BadRequestException('User is already inactive');
    }

    return await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        is_active: false,
      },
    });
  }

  /**
   * Reactivate a soft-deleted user
   */
  async reactivate(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.is_active) {
      throw new BadRequestException('User is already active');
    }

    return await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        is_active: true,
      },
    });
  }

  /**
   * Get users by role
   */
  async findByRole(role: UserRole) {
    return await this.prisma.user.findMany({
      where: {
        roles: {
          has: role,
        },
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
