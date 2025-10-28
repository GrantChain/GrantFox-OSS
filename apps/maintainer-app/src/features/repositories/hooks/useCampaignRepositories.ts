import { useQuery } from "@tanstack/react-query";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";

const repoService = new RepositoriesService(http);

export function useCampaignRepositories(campaignId?: string) {
  return useQuery<{ github_repo_id: number }[]>({
    queryKey: ["campaign-repos", campaignId ?? "none"],
    enabled: Boolean(campaignId),
    queryFn: async () =>
      repoService.getRepositoriesByCampaign(campaignId as string),
    staleTime: 1000 * 30,
  });
}
