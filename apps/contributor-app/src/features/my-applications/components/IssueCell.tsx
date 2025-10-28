"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, HashIcon } from "lucide-react";
import type { ApplicationRow } from "@/types/applications.type";

export type IssueCellProps = {
  /** Application data for the row */
  application: ApplicationRow;
};

export const IssueCell: React.FC<IssueCellProps> = React.memo(
  ({ application }) => {
    const showPr = typeof application.prNumber === "number";
    const badgeNumber = showPr ? application.prNumber : application.number;
    const [owner, name] = React.useMemo(
      () => application.repo.split("/"),
      [application.repo]
    );

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Badge className="gap-1" variant={showPr ? "important" : "success"}>
            {showPr ? (
              <CircleCheck className="size-4" />
            ) : (
              <HashIcon className="size-4" />
            )}
            {badgeNumber}
          </Badge>
          <Link
            href={`/campaigns/org/${owner}/repo/${name}/issue/${application.number}`}
            className="font-medium hover:underline"
          >
            {application.title}
          </Link>
        </div>
        <span className="text-xs text-muted-foreground">
          {application.repo}
        </span>
      </div>
    );
  }
);

IssueCell.displayName = "IssueCell";
