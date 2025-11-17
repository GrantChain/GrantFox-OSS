import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types/notification.type";
import { toast } from "sonner";

// WebSockets connect to the base URL (without /api prefix)
const SOCKET_URL = (process.env.NEXT_PUBLIC_API_URL?.replace("/api", "").replace(/\/$/, ""));

export function useNotificationSocket(userId: string | undefined) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Create socket connection
    const socket = io(`${SOCKET_URL}/notifications`, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Connection established
    socket.on("connect", () => {
      console.log("[WebSocket] Connected:", socket.id);
      // Subscribe to user's notifications
      socket.emit("subscribe", { userId });
    });

    // Subscription confirmed
    socket.on("subscribed", (data: { userId: string; room: string }) => {
      console.log("[WebSocket] Subscribed to:", data.room);
    });

    // New notification received
    socket.on(
      "new-notification",
      (data: { notification: Notification; timestamp: string }) => {
        console.log("[WebSocket] New notification:", data.notification);

        // Invalidate queries to refetch notifications
        queryClient.invalidateQueries({
          queryKey: ["notifications", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["notifications", "unread-count", userId],
        });

        // Show toast notification
        toast(data.notification.title, {
          description: data.notification.description,
          duration: 5000,
          action: data.notification.url
            ? {
                label: "View",
                onClick: () => {
                  window.location.href = data.notification.url!;
                },
              }
            : undefined,
        });
      }
    );

    // Notification updated (marked as read or deleted)
    socket.on(
      "notification-updated",
      (data: { notificationId: string; action: string; timestamp: string }) => {
        console.log("[WebSocket] Notification updated:", data);

        // Invalidate queries to refetch
        queryClient.invalidateQueries({
          queryKey: ["notifications", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["notifications", "unread-count", userId],
        });
      }
    );

    // Connection error
    socket.on("connect_error", (error) => {
      console.error("[WebSocket] Connection error:", error.message);
    });

    // Disconnection
    socket.on("disconnect", (reason) => {
      console.log("[WebSocket] Disconnected:", reason);
    });

    // Reconnection attempt
    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("[WebSocket] Reconnection attempt:", attemptNumber);
    });

    // Reconnection success
    socket.on("reconnect", (attemptNumber) => {
      console.log("[WebSocket] Reconnected after", attemptNumber, "attempts");
      // Re-subscribe after reconnection
      socket.emit("subscribe", { userId });
    });

    // Cleanup on unmount
    return () => {
      console.log("[WebSocket] Cleaning up connection");
      socket.emit("unsubscribe", { userId });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, queryClient]);

  return socketRef.current;
}

