import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UnreadCountResponseDto } from './dto/unread-count-response.dto';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all notifications for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({
    name: 'unread',
    required: false,
    type: Boolean,
    description: 'Filter only unread notifications',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all notifications for the user',
    type: [NotificationResponseDto],
  })
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('unread', new ParseBoolPipe({ optional: true }))
    unreadOnly?: boolean,
  ): Promise<NotificationResponseDto[]> {
    return this.notificationsService.findByUser(userId, unreadOnly);
  }

  @Get('user/:userId/unread-count')
  @ApiOperation({ summary: 'Get count of unread notifications for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the count of unread notifications',
    type: UnreadCountResponseDto,
  })
  async getUnreadCount(
    @Param('userId') userId: string,
  ): Promise<UnreadCountResponseDto> {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the notification',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async getNotification(
    @Param('id') id: string,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
    type: NotificationResponseDto,
  })
  async markAsRead(@Param('id') id: string): Promise<NotificationResponseDto> {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('user/:userId/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'All notifications marked as read',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 5 },
      },
    },
  })
  async markAllAsRead(
    @Param('userId') userId: string,
  ): Promise<{ count: number }> {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  async deleteNotification(@Param('id') id: string): Promise<void> {
    return this.notificationsService.delete(id);
  }

  @Delete('user/:userId/all')
  @ApiOperation({ summary: 'Delete all notifications for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'All notifications deleted',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 10 },
      },
    },
  })
  async deleteAllForUser(
    @Param('userId') userId: string,
  ): Promise<{ count: number }> {
    return this.notificationsService.deleteAllForUser(userId);
  }
}

