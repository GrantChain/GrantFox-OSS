"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { EscrowService } from "@/features/escrows/services/escrows.service";
import { ApiEscrow } from "@/types/escrow.type";
import { http } from "@/lib/http";
import { GetEscrowsFromIndexerResponse as Escrow } from "@trustless-work/escrow/types";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow";
import { EscrowsOverviewTable } from "./EscrowsOverviewTable";

type CampaignOption = {
  id: string;
  name: string;
};

type CampaignSelectProps = {
  campaigns: CampaignOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const CampaignSelect: React.FC<CampaignSelectProps> = ({
  campaigns,
  value,
  onChange,
  placeholder = "Select campaign",
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-64">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All campaigns</SelectItem>
        {campaigns.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const Overview: React.FC = () => {
  const escrowService = useMemo(() => new EscrowService(http), []);
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  const { data: apiEscrows, isLoading: loadingApiEscrows } = useQuery<
    ApiEscrow[]
  >({
    queryKey: ["escrows", "all"],
    queryFn: () => escrowService.getEscrows(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

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
  } = useQuery<Escrow[]>({
    queryKey: ["escrows-overview", contractIds, true],
    queryFn: async () => {
      if (!contractIds || contractIds.length === 0) {
        throw new Error(
          "Contract IDs are required to fetch escrows by contract IDs"
        );
      }

      const escrows = (await getEscrowByContractIds({
        contractIds,
        validateOnChain: true,
      })) as unknown;

      if (!escrows) {
        throw new Error("Failed to fetch escrows");
      }

      return escrows as Escrow[];
    },
    enabled: Boolean(contractIds && contractIds.length > 0),
    staleTime: 1000 * 60 * 5,
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
  const isLoading = loadingApiEscrows || loadingIndexed || fetchingIndexed;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">Escrows overview</h3>
          <p className="text-sm text-muted-foreground">
            Browse escrows and milestones across all campaigns.
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

      <EscrowsOverviewTable escrows={filteredEscrows} isLoading={isLoading} />
    </div>
  );
};
