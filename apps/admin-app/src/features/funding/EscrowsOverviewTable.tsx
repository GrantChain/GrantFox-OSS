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
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Copy,
  ExternalLink,
  FileIcon,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BalanceProgressDonut } from "@/components/tw-blocks/escrows/indicators/balance-progress/donut/BalanceProgress";
import { useCopy } from "@/components/tw-blocks/helpers/useCopy";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import Link from "next/link";
import {
  GetEscrowsFromIndexerResponse as Escrow,
  MultiReleaseMilestone,
} from "@trustless-work/escrow/types";

type EscrowsOverviewTableProps = {
  escrows: Escrow[] | undefined;
  isLoading: boolean;
};

export const EscrowsOverviewTable: React.FC<EscrowsOverviewTableProps> = ({
  escrows,
  isLoading,
}) => {
  const { copiedKeyId, copyToClipboard } = useCopy();

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

  const columns = React.useMemo<ColumnDef<Escrow>[]>(() => {
    return [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
      },
      {
        id: "contractId",
        header: "Payout",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 max-w-[260px]">
            <span className="font-mono text-xs sm:text-sm truncate">
              {formatAddress(row.original.contractId || "", 6)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(row.original.contractId || "")}
              aria-label="Copy contract ID"
              title={copiedKeyId ? "Copied" : "Copy"}
            >
              {copiedKeyId ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>

            <Link
              href={`https://viewer.trustlesswork.com/${row.original.contractId}`}
              target="_blank"
            >
              <ExternalLink className="size-4" />
            </Link>
          </div>
        ),
      },
      {
        id: "signer",
        header: () => (
          <div className="flex items-center gap-2">
            Used Wallet
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                The wallet that was used to create the escrow. Make sure that
                when you approve the milestone, you are connected to this
                wallet.
              </TooltipContent>
            </Tooltip>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2 max-w-[260px]">
            <span className="font-mono text-xs sm:text-sm truncate">
              {formatAddress(row.original.signer || "", 6)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(row.original.signer || "")}
              aria-label="Copy signer address"
              title={copiedKeyId ? "Copied" : "Copy"}
            >
              {copiedKeyId ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        ),
      },
      {
        id: "balance",
        header: () => null,
        cell: ({ row }) => (
          <div className="font-medium">
            <BalanceProgressDonut
              contractId={row.original.contractId || ""}
              target={
                row.original.milestones.reduce(
                  (acc, milestone) =>
                    acc + (milestone as MultiReleaseMilestone).amount,
                  0
                ) ?? 0
              }
              currency={row.original.trustline.name ?? "USDC"}
            />
          </div>
        ),
        size: 120,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              href={{
                pathname: "/dashboard/funding/load",
                query: { contractId: row.original.contractId || "" },
              }}
            >
              <Button size="sm" variant="outline" className="cursor-pointer">
                See details
              </Button>
            </Link>
          </div>
        ),
      },
    ];
  }, [copiedKeyId, copyToClipboard]);

  const table = useReactTable({
    data: escrows ?? [],
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const isEmpty =
    !isLoading &&
    (!escrows || (Array.isArray(escrows) && escrows.length === 0));

  if (isLoading) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <Loader2 className="size-10 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading escrows overview...
        </span>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">No escrows found</span>
      </Card>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="py-6 px-4"
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
