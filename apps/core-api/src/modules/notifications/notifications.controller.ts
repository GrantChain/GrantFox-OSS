import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  ParseBoolPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UnreadCountResponseDto } from './dto/unread-count-response.dto';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('notifications')
@ApiTags('notifications')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth()
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
  @ApiResponse({ status: 403, description: 'Forbidden - Can only access own notifications' })
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('unread', new ParseBoolPipe({ optional: true }))
    unreadOnly?: boolean,
    @CurrentUser() currentUser?: any,
  ): Promise<NotificationResponseDto[]> {
    // Validate that user can only access their own notifications
    if (currentUser.user_id !== userId) {
      throw new ForbiddenException('You can only access your own notifications');
    }
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
  @ApiResponse({ status: 403, description: 'Forbidden - Can only access own notifications' })
  async getUnreadCount(
    @Param('userId') userId: string,
    @CurrentUser() currentUser?: any,
  ): Promise<UnreadCountResponseDto> {
    // Validate that user can only access their own notifications
    if (currentUser.user_id !== userId) {
      throw new ForbiddenException('You can only access your own notifications');
    }
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
  @ApiResponse({ status: 403, description: 'Forbidden - Can only access own notifications' })
  async getNotification(
    @Param('id') id: string,
    @CurrentUser() currentUser?: any,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationsService.findOne(id);
    
    // Validate ownership
    if (notification.user_id !== currentUser.user_id) {
      throw new ForbiddenException('You can only access your own notifications');
    }
    
    return notification;
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only modify own notifications' })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() currentUser?: any,
  ): Promise<NotificationResponseDto> {
    // Verify ownership before marking as read
    const notification = await this.notificationsService.findOne(id);
    if (notification.user_id !== currentUser.user_id) {
      throw new ForbiddenException('You can only modify your own notifications');
    }
    
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
  @ApiResponse({ status: 403, description: 'Forbidden - Can only modify own notifications' })
  async markAllAsRead(
    @Param('userId') userId: string,
    @CurrentUser() currentUser?: any,
  ): Promise<{ count: number }> {
    // Validate that user can only mark their own notifications as read
    if (currentUser.user_id !== userId) {
      throw new ForbiddenException('You can only modify your own notifications');
    }
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own notifications' })
  async deleteNotification(
    @Param('id') id: string,
    @CurrentUser() currentUser?: any,
  ): Promise<void> {
    // Verify ownership before deleting
    const notification = await this.notificationsService.findOne(id);
    if (notification.user_id !== currentUser.user_id) {
      throw new ForbiddenException('You can only delete your own notifications');
    }
    
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
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own notifications' })
  async deleteAllForUser(
    @Param('userId') userId: string,
    @CurrentUser() currentUser?: any,
  ): Promise<{ count: number }> {
    // Validate that user can only delete their own notifications
    if (currentUser.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own notifications');
    }
    return this.notificationsService.deleteAllForUser(userId);
  }
}

