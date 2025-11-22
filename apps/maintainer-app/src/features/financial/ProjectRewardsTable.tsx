"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Info,
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
  CampaignSelect,
  type CampaignOption,
} from "./components/CampaignSelect";
import { MilestoneCard } from "./components/MilestoneCard";
import { useEscrowsByProject } from "./hooks/useEscrowsByProject";
import { useMemo } from "react";
import {
  GetEscrowsFromIndexerResponse as Escrow,
  MultiReleaseEscrow,
  MultiReleaseMilestone,
} from "@trustless-work/escrow/types";
import { useEscrowsByContractIdsQuery } from "@/components/tw-blocks/tanstack/useEscrowsByContractIdsQuery";
import { Loader2, FileIcon } from "lucide-react";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import { useCopy } from "@/components/tw-blocks/helpers/useCopy";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BalanceProgressDonut } from "@/components/tw-blocks/escrows/indicators/balance-progress/donut/BalanceProgress";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Badge } from "@/components/ui/badge";

type ProjectRewardsTableProps = {
  projectId: string;
};

export const ProjectRewardsTable: React.FC<ProjectRewardsTableProps> = ({
  projectId,
}) => {
  const { copiedKeyId, copyToClipboard } = useCopy();
  const { setSelectedEscrow, selectedEscrow } = useEscrowContext();

  const { data: apiEscrows, isLoading: loadingApiEscrows } =
    useEscrowsByProject(projectId);

  const campaigns: CampaignOption[] = useMemo(() => {
    if (!apiEscrows) return [];
    const map = new Map<string, CampaignOption>();
    for (const e of apiEscrows) {
      const id = String(e.campaign.campaign_id);
      if (!map.has(id)) {
        map.set(id, { id, name: e.campaign.name });
      }
    }
    return Array.from(map.values());
  }, [apiEscrows]);

  const [selectedCampaignId, setSelectedCampaignId] =
    React.useState<string>("all");

  const contractIds = useMemo<string[]>(() => {
    return (apiEscrows ?? []).map((e) => String(e.escrow_id));
  }, [apiEscrows]);

  const {
    data: indexedEscrows,
    isLoading: loadingIndexed,
    isFetching: fetchingIndexed,
  } = useEscrowsByContractIdsQuery({
    contractIds: contractIds.length ? contractIds : [],
    validateOnChain: true,
  });

  const filteredEscrows = useMemo<Escrow[] | undefined>(() => {
    if (!indexedEscrows) return indexedEscrows;
    if (selectedCampaignId === "all") return indexedEscrows;
    const idsForCampaign = (apiEscrows ?? [])
      .filter((e) => String(e.campaign.campaign_id) === selectedCampaignId)
      .map((e) => String(e.escrow_id));
    const setIds = new Set(idsForCampaign);
    return indexedEscrows.filter(
      (e) => e.contractId && setIds.has(e.contractId)
    );
  }, [indexedEscrows, apiEscrows, selectedCampaignId]);

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
        id: "expander",
        header: "",
        cell: ({ row }) => (
          <button
            type="button"
            className="p-1"
            onClick={() => {
              const isExpanding = !row.getIsExpanded();
              row.toggleExpanded();
              // Set or clear selected escrow when expanding/collapsing
              if (isExpanding) {
                setSelectedEscrow(row.original as MultiReleaseEscrow);
              } else {
                setSelectedEscrow(undefined);
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
          <div className="flex flex-col gap-1">
            <div className="font-medium flex items-center gap-2">
              <span>{row.original.title}</span>
              {(() => {
                const milestones = row.original
                  .milestones as MultiReleaseMilestone[];
                const hasMilestones =
                  Array.isArray(milestones) && milestones.length > 0;
                const allFinished =
                  hasMilestones &&
                  milestones.every(
                    (m) =>
                      m.flags?.released === true || m.flags?.resolved === true
                  );

                if (!allFinished) return null;

                return (
                  <Badge variant="success" className="ml-1">
                    Finished
                  </Badge>
                );
              })()}
            </div>
          </div>
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
              onClick={() =>
                copyToClipboard(
                  row.original.contractId || "",
                  row.original.contractId || ""
                )
              }
              aria-label="Copy contract ID"
              title={
                copiedKeyId === (row.original.contractId || "")
                  ? "Copied"
                  : "Copy"
              }
            >
              {copiedKeyId === (row.original.contractId || "") ? (
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
              onClick={() =>
                copyToClipboard(
                  row.original.signer || "",
                  row.original.signer || ""
                )
              }
              aria-label="Copy signer address"
              title={
                copiedKeyId === (row.original.signer || "") ? "Copied" : "Copy"
              }
            >
              {copiedKeyId === (row.original.signer || "") ? (
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
        header: ({ column }) => <></>,
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
    ];
  }, [copiedKeyId, copyToClipboard, setSelectedEscrow]);

  const table = useReactTable({
    data: filteredEscrows ?? [],
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
    getExpandedRowModel: getExpandedRowModel(),
  });

  const isLoading = loadingApiEscrows || loadingIndexed || fetchingIndexed;
  const isEmpty =
    !isLoading &&
    ((apiEscrows && apiEscrows.length === 0) ||
      (filteredEscrows && filteredEscrows.length === 0));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">Project rewards</h3>
          <p className="text-sm text-muted-foreground">
            Browse escrows and milestones for this project&apos;s campaigns.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <CampaignSelect
            campaigns={campaigns}
            value={selectedCampaignId}
            onChange={setSelectedCampaignId}
            placeholder="Filter by campaign"
          />
        </div>
      </div>

      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading project rewards...
          </span>
        </Card>
      ) : isEmpty ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            No project rewards found
          </span>
        </Card>
      ) : (
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
                  <React.Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="py-6 px-4"
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={row.getVisibleCells().length}>
                          <div className="p-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {(
                                (selectedEscrow &&
                                selectedEscrow.contractId ===
                                  row.original.contractId
                                  ? selectedEscrow.milestones
                                  : row.original
                                      .milestones) as MultiReleaseMilestone[]
                              ).map((m, i) => (
                                <MilestoneCard
                                  key={i}
                                  index={i}
                                  milestone={m}
                                  contractId={row.original.contractId || ""}
                                  maintainerAddress={row.original.signer || ""}
                                />
                              ))}
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
      )}
    </div>
  );
};
