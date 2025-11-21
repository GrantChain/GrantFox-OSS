"use client";

import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEscrowsByRoleQuery } from "@/components/tw-blocks/tanstack/useEscrowsByRoleQuery";
import { ReceiverEscrowsTable } from "./ReceiverEscrowsTable";
import { FileIcon, Loader2, Star, User, Wallet } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { UserRole } from "@/types/user.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MultiReleaseEscrow,
  MultiReleaseMilestone,
  GetEscrowsFromIndexerResponse as Escrow,
} from "@trustless-work/escrow/types";
import type { ReceiverMilestoneRow } from "./hooks/useReceiverEscrowColumns";

export const FinancialView: FC = () => {
  const { apiUser, contributorPrimaryWallet } = useUser();

  const contributorWallets = useMemo(
    () =>
      (apiUser?.wallets ?? []).filter(
        (wallet) => wallet.role === UserRole.CONTRIBUTOR
      ),
    [apiUser?.wallets]
  );

  const [selectedWallet, setSelectedWallet] = useState<string>("");

  useEffect(() => {
    if (!selectedWallet && contributorWallets.length > 0) {
      setSelectedWallet(contributorWallets[0]?.address ?? "");
    }
  }, [contributorWallets, selectedWallet]);

  const { data: escrows = [], isLoading } = useEscrowsByRoleQuery({
    role: "receiver",
    roleAddress: selectedWallet,
    isActive: true,
    enabled: Boolean(selectedWallet),
  });

  const milestoneRows: ReceiverMilestoneRow[] = useMemo(() => {
    if (!selectedWallet) return [];

    return (escrows as Escrow[]).flatMap((escrow) => {
      const multi = escrow as MultiReleaseEscrow;
      const milestones = multi.milestones as MultiReleaseMilestone[];

      return milestones
        .map((milestone, index) => ({ milestone, index }))
        .filter(({ milestone }) => milestone.receiver === selectedWallet)
        .map(({ milestone, index }) => ({
          id: `${escrow.contractId ?? escrow.title}-${index}`,
          escrowTitle: escrow.title,
          milestoneDescription: milestone.description ?? null,
          contractId: escrow.contractId ?? "",
          trustlineName: escrow.trustline?.name ?? null,
          milestoneIndex: index,
          milestoneAmount: Number(milestone.amount ?? 0),
          flags: milestone.flags,
          status: milestone.status,
        }));
    });
  }, [escrows, selectedWallet]);

  if (!apiUser) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Financials</h2>
            <p className="text-sm text-muted-foreground">
              Loading your profile information...
            </p>
          </div>
        </div>
        <Card className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground max-w-md">
            Please wait while we load your wallets.
          </p>
        </Card>
      </div>
    );
  }

  if (contributorWallets.length === 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Financials</h2>
            <p className="text-sm text-muted-foreground">
              You do not have any contributor wallets yet.
            </p>
          </div>

          <Link href={`/profile/${apiUser.username}`}>
            <Button variant="outline" className="cursor-pointer">
              <Wallet className="size-4" /> Set Wallet
            </Button>
          </Link>
        </div>
        <Card className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          <Wallet className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground max-w-md">
            Add a contributor wallet to start receiving rewards and see your
            escrows here.
          </p>
        </Card>
      </div>
    );
  }

  const isEmpty = selectedWallet && !isLoading && milestoneRows.length === 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Financials</h2>
          <p className="text-sm text-muted-foreground">
            Escrows where your contributor wallets are the receiver.
          </p>
        </div>
        <Link href={`/profile/${apiUser.username}`}>
          <Button variant="outline" className="cursor-pointer">
            <User className="size-4" /> Open Profile
          </Button>
        </Link>
      </div>

      <Tabs
        value={selectedWallet}
        onValueChange={setSelectedWallet}
        className="w-full"
      >
        <TabsList className="w-full sm:w-1/5 md:w-1/3 justify-start overflow-x-auto">
          {contributorWallets.map((wallet) => {
            const address = wallet.address;

            const isPrimary =
              contributorPrimaryWallet?.primaryWallet === address ||
              wallet.is_primary;

            return (
              <TabsTrigger
                key={wallet.wallet_id}
                value={address}
                className="flex items-center gap-1 text-xs sm:text-sm cursor-pointer"
              >
                {isPrimary ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 dark:text-yellow-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Primary wallet</p>
                    </TooltipContent>
                  </Tooltip>
                ) : null}

                <span>{formatAddress(address, 6)}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading your escrows...
          </span>
        </Card>
      ) : isEmpty ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="h-10 w-10" />
          <span className="text-sm text-muted-foreground text-center max-w-md">
            No rewards found for the selected contributor wallet.
          </span>
        </Card>
      ) : (
        <ReceiverEscrowsTable rows={milestoneRows} />
      )}
    </div>
  );
};
