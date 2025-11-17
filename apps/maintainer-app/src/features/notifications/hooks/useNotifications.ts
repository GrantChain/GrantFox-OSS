import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { NotificationsService } from "../services/notifications.service";
import { Notification } from "@/types/notification.type";

const notificationsService = new NotificationsService(http);

export function useNotifications(userId: string | undefined, unreadOnly = false) {
  return useQuery<Notification[]>({
    queryKey: ["notifications", userId, unreadOnly],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return notificationsService.getUserNotifications(userId, unreadOnly);
    },
    enabled: !!userId,
    refetchInterval: 60000, // Refetch every 60 seconds as fallback (WebSocket is primary)
    staleTime: 30000, // Consider data fresh for 30 seconds
  });
}

export function useUnreadCount(userId: string | undefined) {
  return useQuery({
    queryKey: ["notifications", "unread-count", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return notificationsService.getUnreadCount(userId);
    },
    enabled: !!userId,
    refetchInterval: 60000, // Refetch every 60 seconds as fallback (WebSocket is primary)
    staleTime: 30000, // Consider data fresh for 30 seconds
  });
}

