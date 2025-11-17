import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Notification } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [
          process.env.MAINTAINER_APP_URL,
          process.env.CONTRIBUTOR_APP_URL,
          process.env.ADMIN_APP_URL,
        ].filter(Boolean)
      : true, // In development, allow all origins
    credentials: true,
  },
  namespace: 'notifications',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  // Track which users are in which rooms
  private userRooms = new Map<string, string>(); // socketId -> userId

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.userRooms.get(client.id);
    if (userId) {
      this.logger.log(`Client disconnected: ${client.id} (User: ${userId})`);
      this.userRooms.delete(client.id);
    } else {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

  /**
   * Client subscribes to notifications for a specific user
   */
  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { userId } = data;

    if (!userId) {
      this.logger.warn(`Client ${client.id} tried to subscribe without userId`);
      return;
    }

    // Join room for this user
    const roomName = `user-${userId}`;
    client.join(roomName);
    this.userRooms.set(client.id, userId);

    this.logger.log(`Client ${client.id} subscribed to ${roomName}`);

    // Acknowledge subscription
    client.emit('subscribed', { userId, room: roomName });
  }

  /**
   * Client unsubscribes from notifications
   */
  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { userId } = data;
    const roomName = `user-${userId}`;

    client.leave(roomName);
    this.userRooms.delete(client.id);

    this.logger.log(`Client ${client.id} unsubscribed from ${roomName}`);
  }

  /**
   * Send notification to specific user
   * Called by NotificationsListener when a notification is created
   */
  notifyUser(userId: string, notification: Notification) {
    const roomName = `user-${userId}`;

    this.logger.log(`Sending notification to ${roomName}`);

    this.server.to(roomName).emit('new-notification', {
      notification,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send bulk notifications to multiple users
   */
  notifyUsers(notifications: Array<{ userId: string; notification: Notification }>) {
    notifications.forEach(({ userId, notification }) => {
      this.notifyUser(userId, notification);
    });
  }

  /**
   * Broadcast notification update (mark as read, delete, etc)
   */
  notificationUpdated(userId: string, notificationId: string, action: 'read' | 'deleted') {
    const roomName = `user-${userId}`;

    this.logger.log(`Broadcasting ${action} update to ${roomName}`);

    this.server.to(roomName).emit('notification-updated', {
      notificationId,
      action,
      timestamp: new Date().toISOString(),
    });
  }
}

