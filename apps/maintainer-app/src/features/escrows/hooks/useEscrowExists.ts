import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { EscrowsService } from "@/features/escrows/services/escrows.service";
import { http } from "@/lib/api";
import type { CheckIfEscrowExistsResponse } from "@/types/escrow.type";

type UseEscrowExistsArgs = {
  campaignId: string | null | undefined;
  projectId: string | null | undefined;
  enabled?: boolean;
};

export function useEscrowExists({
  campaignId,
  projectId,
  enabled = true,
}: UseEscrowExistsArgs) {
  const service = useMemo(() => new EscrowsService(http), []);

  return useQuery<boolean>({
    queryKey: ["escrows", "exists", campaignId, projectId],
    enabled: enabled && Boolean(campaignId) && Boolean(projectId),
    queryFn: async () => {
      const data: CheckIfEscrowExistsResponse =
        await service.checkIfEscrowExists({
          campaign_id: String(campaignId),
          project_id: String(projectId),
        });
      return data.exists;
    },

    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
