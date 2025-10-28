"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { MessageSquareIcon } from "lucide-react";

export type CommentsBadgeProps = {
  /** Number of comments on the issue */
  count: number;
};

export const CommentsBadge: React.FC<CommentsBadgeProps> = React.memo(
  ({ count }) => (
    <Badge variant="outline">
      <MessageSquareIcon className="size-4" />
      {count}
    </Badge>
  )
);

CommentsBadge.displayName = "CommentsBadge";
