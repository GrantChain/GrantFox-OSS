"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { MultiReleaseMilestone } from "@trustless-work/escrow/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  ExternalLink,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  GitPullRequest,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import { splitMilestoneDescription } from "@/components/tw-blocks/helpers/split-milestone.helper";

type EscrowStatus =
  | "released"
  | "resolved"
  | "disputed"
  | "in_progress"
  | "rejected";

export interface ReceiverMilestoneRow {
  id: string;
  escrowTitle: string;
  milestoneDescription: string | null;
  contractId: string;
  trustlineName: string | null;
  milestoneIndex: number;
  milestoneAmount: number;
  flags: MultiReleaseMilestone["flags"] | undefined;
  status: MultiReleaseMilestone["status"] | undefined;
}

const getMilestoneStatus = (row: ReceiverMilestoneRow): EscrowStatus => {
  // Explicit rejection from milestone status takes precedence.
  if (row.status === "REJECTED") {
    return "rejected";
  }
  const flags = row.flags;

  if (!flags) return "in_progress";
  if (flags.resolved || flags.released) return "released";
  if (flags.disputed) return "disputed";
  return "in_progress";
};

const renderStatusBadge = (status: EscrowStatus) => {
  if (status === "rejected") {
    return (
      <Badge variant="destructive" className="gap-1 uppercase">
        <AlertCircle className="h-3 w-3" />
        Rejected
      </Badge>
    );
  }

  if (status === "released" || status === "resolved") {
    return (
      <Badge variant="success" className="gap-1 uppercase">
        <CheckCircle2 className="h-3 w-3" />
        Paid
      </Badge>
    );
  }

  if (status === "disputed") {
    return (
      <Badge variant="destructive" className="gap-1 uppercase">
        <AlertCircle className="h-3 w-3" />
        Disputed
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1 uppercase">
      <Clock className="h-3 w-3" />
      Processing
    </Badge>
  );
};

const formatAmount = (amount: number): string => {
  return amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};

/**
 * Column definitions for the receiver milestones table, memoized and ready for reuse.
 * Each row represents a single milestone of a multi-release escrow.
 */
export function useReceiverEscrowColumns(): ColumnDef<ReceiverMilestoneRow>[] {
  return React.useMemo<ColumnDef<ReceiverMilestoneRow>[]>(
    () => [
      {
        id: "issue",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Issue
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const description = row.original.milestoneDescription ?? "";
          const title =
            splitMilestoneDescription(description, "title") ??
            row.original.escrowTitle;
          const issueLink = splitMilestoneDescription(description, "issueLink");

          return (
            <div className="flex flex-col gap-1 max-w-[260px]">
              {issueLink ? (
                <Link
                  href={issueLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm truncate hover:underline"
                >
                  {title}
                </Link>
              ) : (
                <span className="font-medium text-sm truncate">{title}</span>
              )}
            </div>
          );
        },
      },
      {
        id: "repository",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Repository
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const description = row.original.milestoneDescription ?? "";
          const title =
            splitMilestoneDescription(description, "repository") ??
            row.original.escrowTitle;
          const repositoryLink = `https://github.com/${title}`;

          return (
            <div className="flex flex-col gap-1 max-w-[260px]">
              {repositoryLink ? (
                <Link
                  href={repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm truncate hover:underline"
                >
                  {title}
                </Link>
              ) : (
                <span className="font-medium text-sm truncate">{title}</span>
              )}
            </div>
          );
        },
      },
      {
        id: "pr",
        header: () => <span>PR</span>,
        cell: ({ row }) => {
          const description = row.original.milestoneDescription ?? "";
          const prLink = splitMilestoneDescription(description, "prLink");

          if (!prLink) {
            return <span className="text-xs text-muted-foreground">—</span>;
          }

          return (
            <Link
              href={prLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              <GitPullRequest className="h-3 w-3" />
              <span>PR</span>
            </Link>
          );
        },
      },
      {
        id: "amount",
        header: () => (
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Reward</span>
          </div>
        ),
        cell: ({ row }) => {
          const currency = row.original.trustlineName ?? "USDC";

          return (
            <div className="flex flex-col">
              <span className="font-medium">
                {formatAmount(row.original.milestoneAmount)} {currency}
              </span>
            </div>
          );
        },
      },
      {
        id: "status",
        header: () => <span>Status</span>,
        cell: ({ row }) => {
          const status = getMilestoneStatus(row.original);
          return (
            <div className="flex items-center">{renderStatusBadge(status)}</div>
          );
        },
      },
      {
        id: "contract",
        header: () => <span>Contract</span>,
        cell: ({ row }) => {
          const contractId = row.original.contractId;

          return (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm truncate">
                {formatAddress(contractId, 6)}
              </span>
              {contractId ? (
                <Link
                  href={`https://viewer.trustlesswork.com/${contractId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          );
        },
      },
    ],
    []
  );
}
