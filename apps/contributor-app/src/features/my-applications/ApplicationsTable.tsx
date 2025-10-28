"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUpRightIcon,
  ChevronDown,
  CircleCheck,
  GithubIcon,
  HashIcon,
  MessageSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import Link from "next/link";

export type ApplicationStatus =
  | "AWAITING_ASSIGNMENT"
  | "PR_EXPECTED"
  | "IN_REVIEW"
  | "COMPLETED"
  | "ASSIGNED_TO_OTHER";

export interface ApplicationRow {
  id: number;
  number: number;
  title: string;
  repo: string; // owner/name
  html_url: string;
  comments: number;
  created_at: string;
  applied_at: string | null;
  assignee: string | null;
  state: "open" | "closed";
  status: ApplicationStatus;
  labels: string[];
  prNumber: number | null;
}

const statusToBadge = (status: ApplicationStatus): React.ReactNode => {
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
};

/**
 * Props for ApplicationsTable.
 * - rows: array of application rows to render in the datatable.
 */
type ApplicationsTableProps = {
  rows: ApplicationRow[];
};

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  rows,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = React.useMemo<ColumnDef<ApplicationRow>[]>(
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
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {(() => {
                const showPr = typeof row.original.prNumber === "number";
                const badgeNumber = showPr
                  ? row.original.prNumber!
                  : row.original.number;

                return (
                  <Badge
                    className="gap-1"
                    variant={showPr ? "important" : "success"}
                  >
                    {showPr ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <HashIcon className="size-4" />
                    )}
                    {badgeNumber}
                  </Badge>
                );
              })()}
              <Link
                href={`/campaigns/org/${row.original.repo.split("/")[0]}/repo/${row.original.repo.split("/")[1]}/issue/${row.original.number}`}
                className="font-medium hover:underline"
              >
                {row.original.title}
              </Link>
            </div>
            <span className="text-xs text-muted-foreground">
              {row.original.repo}
            </span>
          </div>
        ),
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
        cell: ({ row }) => statusToBadge(row.original.status),
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
        cell: ({ row }) => (
          <Badge variant="outline">
            <MessageSquareIcon className="size-4" />
            {row.original.comments}
          </Badge>
        ),
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
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end">
            <Link href={row.original.html_url} target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="cursor-pointer">
                <GithubIcon className="size-4" />
                View
                <ArrowUpRightIcon className="size-4" />
              </Button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={
            (table.getColumn("status")?.getFilterValue() as string) ?? "ALL"
          }
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "ALL" ? undefined : value)
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="AWAITING_ASSIGNMENT">
              Awaiting assignment
            </SelectItem>
            <SelectItem value="PR_EXPECTED">PR expected</SelectItem>
            <SelectItem value="IN_REVIEW">In review</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ASSIGNED_TO_OTHER">
              Assigned to another
            </SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-6 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center py-4">
        {table.getState().pagination.pageSize <
        table.getFilteredRowModel().rows.length ? (
          <Button
            size="sm"
            onClick={() =>
              table.setPageSize(
                Math.min(
                  table.getState().pagination.pageSize + 10,
                  table.getFilteredRowModel().rows.length
                )
              )
            }
          >
            Load More
          </Button>
        ) : null}
      </div>
    </div>
  );
};
