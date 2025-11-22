import { EscrowsService } from "@/features/escrows/services/escrows.service";
import { ApiEscrow } from "@/types/escrow.type";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { useMemo } from "react";

export const useEscrowsByProject = (projectId: string) => {
  const service = useMemo(() => new EscrowsService(http), []);

  return useQuery<ApiEscrow[]>({
    queryKey: ["escrows", "project", projectId],
    queryFn: () => service.getEscrowsByProject(projectId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
