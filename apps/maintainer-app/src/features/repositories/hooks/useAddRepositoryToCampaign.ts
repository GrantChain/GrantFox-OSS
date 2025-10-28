import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";
import type {
  Repository as DbRepository,
  CampaignRepositoryPayload,
  AddRepositoriesToCampaignResponse,
} from "@/types/repositories.type";

const repoService = new RepositoriesService(http);

export function useAddRepositoryToCampaign(campaignId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (repo: DbRepository) => {
      if (!campaignId) throw new Error("No campaign available");
      const payload: CampaignRepositoryPayload = {
        repository_ids: [repo.github_repo_id],
      };
      return await repoService.addRepositoryToCampaign(campaignId, payload);
    },
    onSuccess: async (res: AddRepositoriesToCampaignResponse) => {
      if (res.added && res.added.length > 0) {
        toast.success("Repository registered to campaign");
      } else if (res.errors && res.errors.length > 0) {
        const details = res.errors.map((e) => e.error).join("; ");
        toast.error(
          details || res.message || "Failed to register repository to campaign"
        );
      } else {
        toast.error(res.message || "Failed to register repository to campaign");
      }
      await queryClient.invalidateQueries({
        queryKey: ["campaign-repos", campaignId ?? "none"],
      });
    },
    onError: () => {
      toast.error("Failed to register repository to campaign");
    },
  });
}
