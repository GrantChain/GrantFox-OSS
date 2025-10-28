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
    const isMerged = application.status === "COMPLETED" && showPr;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {isMerged ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 border border-fuchsia-200 dark:border-fuchsia-700/50 rounded-lg hover:bg-fuchsia-100 dark:bg-fuchsia-900/50 dark:hover:bg-fuchsia-900 transition-colors duration-200">
              <CircleCheck className="size-4" />
              PR Merged
            </span>
          ) : (
            <Badge className="gap-1" variant={showPr ? "important" : "success"}>
              {showPr ? (
                <CircleCheck className="size-4" />
              ) : (
                <HashIcon className="size-4" />
              )}
              {badgeNumber}
            </Badge>
          )}
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
