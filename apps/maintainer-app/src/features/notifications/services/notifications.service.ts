import { AxiosInstance } from "axios";
import { Notification, UnreadCountResponse } from "@/types/notification.type";

export class NotificationsService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getUserNotifications(
    userId: string,
    unreadOnly?: boolean
  ): Promise<Notification[]> {
    try {
      const params = unreadOnly ? { unread: true } : {};
      const { data } = await this.http.get(`/notifications/user/${userId}`, {
        params,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to get notifications", { cause: error });
    }
  }

  async getUnreadCount(userId: string): Promise<UnreadCountResponse> {
    try {
      const { data } = await this.http.get(
        `/notifications/user/${userId}/unread-count`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get unread count", { cause: error });
    }
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const { data } = await this.http.patch(
        `/notifications/${notificationId}/read`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to mark notification as read", { cause: error });
    }
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    try {
      const { data } = await this.http.patch(
        `/notifications/user/${userId}/read-all`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to mark all notifications as read", {
        cause: error,
      });
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await this.http.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw new Error("Failed to delete notification", { cause: error });
    }
  }

  async deleteAllNotifications(userId: string): Promise<{ count: number }> {
    try {
      const { data } = await this.http.delete(
        `/notifications/user/${userId}/all`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to delete all notifications", { cause: error });
    }
  }
}

