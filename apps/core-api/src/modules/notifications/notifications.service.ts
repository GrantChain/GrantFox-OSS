import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => NotificationsGateway))
    private notificationsGateway: NotificationsGateway,
  ) {}

  /**
   * Helper method to transform Prisma notification (with null) to DTO (with undefined)
   */
  private toDto(notification: any): NotificationResponseDto {
    return {
      ...notification,
      icon: notification.icon ?? undefined,
      url: notification.url ?? undefined,
      metadata: notification.metadata ?? undefined,
    };
  }

  /**
   * Create a single notification
   */
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.create({
      data: createNotificationDto,
    });

    // Send real-time notification via WebSocket
    this.notificationsGateway.notifyUser(notification.user_id, notification);

    return this.toDto(notification);
  }

  /**
   * Create multiple notifications at once (bulk insert)
   */
  async createMany(
    createNotificationDtos: CreateNotificationDto[],
  ): Promise<{ count: number }> {
    // Create notifications one by one to get the full records back
    const notifications = await Promise.all(
      createNotificationDtos.map((dto) =>
        this.prisma.notification.create({ data: dto }),
      ),
    );

    // Send real-time notifications via WebSocket
    notifications.forEach((notification) => {
      this.notificationsGateway.notifyUser(notification.user_id, notification);
    });

    return { count: notifications.length };
  }

  /**
   * Get all notifications for a specific user
   */
  async findByUser(
    userId: string,
    unreadOnly: boolean = false,
  ): Promise<NotificationResponseDto[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user_id: userId,
        ...(unreadOnly && { is_read: false }),
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return notifications.map((n) => this.toDto(n));
  }

  /**
   * Get a single notification by ID
   */
  async findOne(notificationId: string): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.findUnique({
      where: { notification_id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }

    return this.toDto(notification);
  }

  /**
   * Get count of unread notifications for a user
   */
  async getUnreadCount(userId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });

    return count;
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.update({
      where: { notification_id: notificationId },
      data: { is_read: true },
    });

    return this.toDto(notification);
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return { count: result.count };
  }

  /**
   * Delete a notification
   */
  async delete(notificationId: string): Promise<void> {
    await this.prisma.notification.delete({
      where: { notification_id: notificationId },
    });
  }

  /**
   * Delete all notifications for a user
   */
  async deleteAllForUser(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.deleteMany({
      where: { user_id: userId },
    });

    return { count: result.count };
  }
}

