import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty({
    description: 'Notification ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  notification_id: string;

  @ApiProperty({
    description: 'User ID who receives the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;

  @ApiProperty({
    description: 'Type of notification',
    enum: NotificationType,
    example: 'PROJECT_APPROVED',
  })
  type: NotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: '🎉 Project Approved!',
  })
  title: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'Your project "GrantFox OSS" has been approved and is now active.',
  })
  description: string;

  @ApiProperty({
    description: 'Icon identifier for the notification',
    example: 'check-circle',
    required: false,
  })
  icon?: string;

  @ApiProperty({
    description: 'URL to navigate when notification is clicked',
    example: '/projects/123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  url?: string;

  @ApiProperty({
    description: 'Whether the notification has been read',
    example: false,
  })
  is_read: boolean;

  @ApiProperty({
    description: 'Additional metadata in JSON format',
    example: { projectId: '123e4567-e89b-12d3-a456-426614174000' },
    required: false,
  })
  metadata?: any;

  @ApiProperty({
    description: 'Timestamp when the notification was created',
    example: '2024-01-15T10:30:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the notification was last updated',
    example: '2024-01-15T10:30:00Z',
  })
  updated_at: Date;
}

