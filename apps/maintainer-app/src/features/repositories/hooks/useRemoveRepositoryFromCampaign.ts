import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";

const repoService = new RepositoriesService(http);

export function useRemoveRepositoryFromCampaign(
  campaignId: string | undefined
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (githubRepoId: number) => {
      if (!campaignId) throw new Error("No campaign available");
      return await repoService.removeRepositoryFromCampaign(
        campaignId,
        String(githubRepoId)
      );
    },
    onSuccess: async () => {
      toast.success("Repository removed from campaign");
      await queryClient.invalidateQueries({
        queryKey: ["campaign-repos", campaignId ?? "none"],
      });
    },
    onError: () => {
      toast.error("Failed to remove repository from campaign");
    },
  });
}
