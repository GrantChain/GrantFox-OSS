import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { NotificationsService } from "../services/notifications.service";
import { toast } from "sonner";

const notificationsService = new NotificationsService(http);

export function useMarkAsRead(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationsService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count", userId],
      });
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    },
  });
}

export function useMarkAllAsRead(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!userId) throw new Error("User ID is required");
      return notificationsService.markAllAsRead(userId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count", userId],
      });
      if (data.count > 0) {
        toast.success(`Marked ${data.count} notifications as read`);
      }
    },
    onError: (error) => {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    },
  });
}

export function useDeleteNotification(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationsService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count", userId],
      });
      toast.success("Notification deleted");
    },
    onError: (error) => {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    },
  });
}

