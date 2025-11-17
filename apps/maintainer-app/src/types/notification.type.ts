export enum NotificationType {
  PROJECT_APPROVED = "PROJECT_APPROVED",
  PROJECT_REJECTED = "PROJECT_REJECTED",
  MAINTAINER_ADDED = "MAINTAINER_ADDED",
}

export interface Notification {
  notification_id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  description: string;
  icon?: string;
  url?: string;
  is_read: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface UnreadCountResponse {
  count: number;
}

