"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { IssueCell } from "../components/IssueCell";
import { StatusBadge } from "../components/StatusBadge";
import { CommentsBadge } from "../components/CommentsBadge";
import { ActionsCell } from "../components/ActionsCell";
import type { ApplicationRow } from "@/types/applications.type";

/**
 * Column definitions for the Applications table, memoized and ready for reuse.
 */
export function useApplicationColumns(): ColumnDef<ApplicationRow>[] {
  return React.useMemo<ColumnDef<ApplicationRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Issue
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <IssueCell application={row.original} />,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "comments",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Comments
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <CommentsBadge count={row.original.comments} />,
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Applied
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) =>
          formatDate(
            row.original.applied_at ?? row.original.created_at ?? "",
            true,
            true
          ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: "",
        cell: ({ row }) => <ActionsCell htmlUrl={row.original.html_url} />,
      },
    ],
    []
  );
}
