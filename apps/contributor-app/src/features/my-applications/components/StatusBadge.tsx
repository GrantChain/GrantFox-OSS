"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import type { ApplicationStatus } from "@/types/applications.type";

export type StatusBadgeProps = {
  /** Application status to display */
  status: ApplicationStatus;
};

export const StatusBadge: React.FC<StatusBadgeProps> = React.memo(
  ({ status }) => {
    switch (status) {
      case "AWAITING_ASSIGNMENT":
        return (
          <Badge className="uppercase" variant="warning">
            Awaiting assignment
          </Badge>
        );
      case "PR_EXPECTED":
        return (
          <Badge className="uppercase" variant="warning">
            PR expected
          </Badge>
        );
      case "IN_REVIEW":
        return (
          <Badge className="uppercase" variant="important">
            In review
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="uppercase" variant="success">
            <CircleCheck className="size-4" />
            Completed
          </Badge>
        );
      case "ASSIGNED_TO_OTHER":
        return (
          <Badge className="uppercase" variant="destructive">
            Assigned to another
          </Badge>
        );
    }
  }
);

StatusBadge.displayName = "StatusBadge";
