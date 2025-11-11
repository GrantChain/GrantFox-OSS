"use client";

import * as React from "react";
import type { Wallet } from "@/types/wallets.type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { useUser } from "@/context/UserContext";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import { ExternalLink, Copy } from "lucide-react";
import Link from "next/link";

type WalletsTableProps = {
  wallets: Wallet[];
};

export const WalletsTable: React.FC<WalletsTableProps> = ({ wallets }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [settingId, setSettingId] = React.useState<string | null>(null);
  const { user } = useUser();
  const authService = React.useMemo(() => new AuthService(http), []);
  const queryClient = useQueryClient();

  const columns = React.useMemo<ColumnDef<Wallet>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => {
          const addr = row.original.address;
          const explorerUrl = `https://stellar.expert/explorer/public/account/${addr}`;
          return (
            <div className="flex items-center gap-2 max-w-[260px] md:max-w-[420px]">
              <span className="truncate font-mono text-sm">
                {formatAddress(addr, 20)}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Stellar Expert"
                  className="p-1 hover:text-primary cursor-pointer"
                >
                  <ExternalLink className="size-4" />
                </Link>
                <button
                  type="button"
                  aria-label="Copy address"
                  className="p-1 hover:text-primary cursor-pointer"
                  onClick={() => {
                    void navigator.clipboard.writeText(addr);
                    toast.success("Address copied");
                  }}
                >
                  <Copy className="size-4" />
                </button>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "is_primary",
        header: "Primary",
        cell: ({ row }) => (
          <span className="text-xs rounded-full border px-2 py-0.5">
            {row.original.is_primary ? "Yes" : "No"}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Added",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(row.original.created_at)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const w = row.original;
          if (w.is_primary) {
            return <></>;
          }

          const isLoading = settingId === w.wallet_id;
          return (
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
              disabled={!user?.id || isLoading}
              onClick={async () => {
                if (!user?.id) return;
                setSettingId(w.wallet_id);
                try {
                  await authService.setPrimaryWallet(user.id, w.wallet_id);
                  queryClient.setQueryData<Wallet[]>(
                    ["wallets", user.id],
                    (prev = []) =>
                      prev.map((item) => ({
                        ...item,
                        is_primary: item.wallet_id === w.wallet_id,
                      }))
                  );
                  toast.success("Wallet set as primary successfully");
                } catch {
                  toast.error("Failed to set primary wallet");
                } finally {
                  setSettingId(null);
                }
              }}
            >
              {isLoading ? "Setting..." : "Set primary"}
            </Button>
          );
        },
      },
    ],
    [settingId, user?.id, authService, queryClient]
  );

  const table = useReactTable({
    data: wallets,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 ? (
        <div className="flex items-center justify-center py-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <span className="mx-3 text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};
