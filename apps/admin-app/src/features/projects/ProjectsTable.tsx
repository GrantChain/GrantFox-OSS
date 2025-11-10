"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/types/project.type";
import { formatDate } from "@/lib/format";
import { ReviewDialog } from "./ReviewDialog";
import { ProjectStatus } from "@/types/project.type";
import { Badge } from "@/components/ui/badge";
import { RepositoryCard } from "@/features/repositories/RepositoryCard";
import { MaintainerCard } from "@/features/maintainers/MaintainerCard";
import { ProjectGeneralInfo } from "./ProjectGeneralInfo";
import { OrganizationsService } from "@/features/github/services/organizations.service";
import type { GithubOrganization } from "@/types/github.type";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ProjectsTableProps = {
  projects: Project[];
};

const OrgAvatarCell: React.FC<{
  handle?: string | null;
}> = ({ handle }) => {
  const avatarUrl = handle ? `https://github.com/${handle}.png` : undefined;
  const fallback = handle?.charAt(0).toUpperCase() ?? "?";
  return (
    <Avatar className="size-8">
      <AvatarImage src={avatarUrl} alt={handle ?? "org"} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export const ProjectsTable = ({ projects }: ProjectsTableProps) => {
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

  const [reviewDialog, setReviewDialog] = React.useState<{
    open: boolean;
    projectId?: string;
    action?:
      | ProjectStatus.APPROVED
      | ProjectStatus.REJECTED
      | ProjectStatus.CHANGES_REQUESTED;
  }>({ open: false });

  const orgService = React.useMemo(() => new OrganizationsService(), []);
  const [orgCache, setOrgCache] = React.useState<
    Record<string, GithubOrganization | null>
  >({});

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: "expander",
        header: "",
        cell: ({ row }) => (
          <button
            type="button"
            className="p-1"
            onClick={async () => {
              const willExpand = !row.getIsExpanded();
              row.toggleExpanded();
              if (willExpand) {
                const handle = row.original.github_handle;
                if (handle && typeof orgCache[handle] === "undefined") {
                  try {
                    const data = await orgService.getOrganization(handle);
                    setOrgCache((prev) => ({ ...prev, [handle]: data }));
                  } catch {
                    setOrgCache((prev) => ({ ...prev, [handle]: null }));
                  }
                }
              }
            }}
            aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 32,
      },
      {
        id: "org",
        header: "Org",
        cell: ({ row }) => (
          <OrgAvatarCell handle={row.original.github_handle} />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={
      //         table.getIsAllPageRowsSelected() ||
      //         (table.getIsSomePageRowsSelected() && "indeterminate")
      //       }
      //       onCheckedChange={(value) =>
      //         table.toggleAllPageRowsSelected(!!value)
      //       }
      //       aria-label="Select all"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label="Select row"
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.original.name}</div>
        ),
      },
      // Removed GitHub column per request
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
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.status}</Badge>
        ),
      },
      {
        accessorKey: "short_description",
        header: "Summary",
        cell: ({ row }) => (
          <div className="max-w-[420px] truncate text-muted-foreground">
            {row.original.short_description}
          </div>
        ),
      },
      {
        accessorKey: "tech_stack",
        header: "Tech",
        cell: ({ row }) => (
          <div className="max-w-[280px] truncate">
            {row.original.tech_stack?.join(", ")}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => row.original.category,
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => formatDate(row.original.created_at),
      },
      {
        id: "actions",
        header: () => {
          const hasPendingProjects = projects.some(
            (project) => project.status === ProjectStatus.PENDING
          );
          return hasPendingProjects ? "Actions" : "";
        },
        enableHiding: false,
        cell: ({ row }) => {
          const project = row.original;
          return (
            <div className="flex gap-2">
              {project.status === ProjectStatus.PENDING && (
                <>
                  <Button
                    size="sm"
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() =>
                      setReviewDialog({
                        open: true,
                        projectId: project.project_id,
                        action: ProjectStatus.APPROVED,
                      })
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() =>
                      setReviewDialog({
                        open: true,
                        projectId: project.project_id,
                        action: ProjectStatus.REJECTED,
                      })
                    }
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [orgService, orgCache, projects]
  );

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
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
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value={ProjectStatus.PENDING}>PENDING</SelectItem>
            <SelectItem value={ProjectStatus.APPROVED}>APPROVED</SelectItem>
            <SelectItem value={ProjectStatus.REJECTED}>REJECTED</SelectItem>
            <SelectItem value={ProjectStatus.CHANGES_REQUESTED}>
              CHANGES_REQUESTED
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-end gap-2 ml-auto">
          <Button variant="outline">
            <span className="font-bold">Total:</span>{" "}
            {table.getFilteredRowModel().rows.length}
          </Button>
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
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() ? (
                    <TableRow>
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="p-10"
                      >
                        {(() => {
                          const handle = row.original.github_handle;
                          const org = handle ? orgCache[handle] : undefined;
                          return org ? (
                            <ProjectGeneralInfo organization={org} />
                          ) : null;
                        })()}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <h4 className="font-medium">Repositories</h4>
                            {row.original.repositories?.length === 0 ? (
                              <div className="space-y-2">
                                <p className="text-muted-foreground">
                                  No repositories found.
                                </p>
                              </div>
                            ) : null}

                            <div className="space-y-2">
                              {row.original.repositories?.map((repo) => {
                                return (
                                  <RepositoryCard
                                    key={repo.github_repo_id}
                                    repository={repo}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Maintainers</h4>
                            {row.original.maintainers?.length === 0 ? (
                              <div className="space-y-2">
                                <p className="text-muted-foreground">
                                  No maintainers found.
                                </p>
                              </div>
                            ) : null}

                            <div className="space-y-2">
                              {row.original.maintainers?.map((maintainer) => {
                                return (
                                  <MaintainerCard
                                    key={maintainer.user_id}
                                    maintainer={maintainer}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
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

      <ReviewDialog
        open={reviewDialog.open}
        onOpenChange={(open) => setReviewDialog((s) => ({ ...s, open }))}
        projectId={reviewDialog.projectId ?? ""}
        action={reviewDialog.action ?? ProjectStatus.APPROVED}
      />
    </div>
  );
};
