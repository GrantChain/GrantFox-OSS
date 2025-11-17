"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  X,
  Loader2,
  CheckCircle,
  XCircle,
  UserPlus,
  Rocket,
  Edit,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useNotifications, useUnreadCount } from "../hooks/useNotifications";
import {
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from "../hooks/useNotificationMutation";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import { Notification } from "@/types/notification.type";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotificationBell() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const userId = user?.id;

  // WebSocket connection for real-time notifications
  useNotificationSocket(userId);

  // Queries
  const { data: unreadCount } = useUnreadCount(userId);
  const { data: notifications, isLoading } = useNotifications(userId);

  // Mutations
  const markAsReadMutation = useMarkAsRead(userId);
  const markAllAsReadMutation = useMarkAllAsRead(userId);
  const deleteNotificationMutation = useDeleteNotification(userId);

  if (!user) return null;

  const hasUnread = (unreadCount?.count ?? 0) > 0;

  const handleMarkAsRead = async (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await markAsReadMutation.mutateAsync(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsReadMutation.mutateAsync();
  };

  const handleDelete = async (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteNotificationMutation.mutateAsync(notificationId);
  };

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center size-9 rounded-md border hover:bg-accent cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount?.count && unreadCount.count > 99 ? "99+" : unreadCount?.count}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-96 max-h-[600px] rounded-xl border bg-popover text-popover-foreground shadow-lg z-50 flex flex-col"
            role="menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {hasUnread && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    disabled={markAllAsReadMutation.isPending}
                    className="text-xs"
                  >
                    <CheckCheck className="size-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-accent rounded-md"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : notifications && notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.notification_id}
                      notification={notification}
                      onMarkAsRead={(e) =>
                        handleMarkAsRead(e, notification.notification_id)
                      }
                      onDelete={(e) =>
                        handleDelete(e, notification.notification_id)
                      }
                      onClose={() => setOpen(false)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Bell className="size-12 text-muted-foreground mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No notifications yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We&apos;ll notify you when something important happens
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onClose: () => void;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onClose,
}: NotificationItemProps) {
  const getNotificationIcon = (iconName?: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "check-circle": <CheckCircle className="size-5 text-green-500" />,
      "x-circle": <XCircle className="size-5 text-red-500" />,
      "user-plus": <UserPlus className="size-5 text-blue-500" />,
      rocket: <Rocket className="size-5 text-purple-500" />,
      edit: <Edit className="size-5 text-orange-500" />,
    };
    return iconMap[iconName ?? ""] ?? <Bell className="size-5 text-muted-foreground" />;
  };

  const content = (
    <div
      className={`group flex gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
        !notification.is_read ? "bg-accent/20" : ""
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-muted/50">
        {getNotificationIcon(notification.icon)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-1">
              {notification.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {notification.description}
            </p>
          </div>
          {!notification.is_read && (
            <span className="flex-shrink-0 size-2 rounded-full bg-blue-500 mt-1.5" />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.created_at), {
              addSuffix: true,
            })}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.is_read && (
              <button
                onClick={onMarkAsRead}
                className="p-1 hover:bg-accent rounded-md"
                title="Mark as read"
              >
                <Check className="size-3.5" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-1 hover:bg-destructive/10 text-destructive rounded-md"
              title="Delete"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If notification has a URL, wrap in Link
  if (notification.url) {
    return (
      <Link href={notification.url} onClick={onClose}>
        {content}
      </Link>
    );
  }

  return content;
}

