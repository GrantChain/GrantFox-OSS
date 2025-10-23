import { http } from "@/lib/api";
import { CampaignService } from "../services/campaign.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";;
import { toast } from "sonner";

type CampaignMutationParams = {
    campaignId: string;
    userId: string;
}

export const useCampaignsMutations = () => {
  const campaignService = new CampaignService(http);
  const queryClient = useQueryClient();

  const registerContributor = useMutation({
    mutationFn: (campaign: CampaignMutationParams) => {
      const { campaignId, userId } = campaign;
      return campaignService.registerContributor(campaignId, userId);
    },
    onSuccess: () => {
      toast.success("Contributor registered successfully");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({
        queryKey: ["register-contributors-with-campaign"],
      });
    },
    onError: (err: unknown) => {
      const message = (err as Error)?.message || "Failed to create campaign";
      toast.error(message);
    },
  });

  return {
    registerContributor: registerContributor.mutate,
  };
};
