import { http } from "@/lib/api";
import { CampaignService } from "../services/campaign.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CampaignMutationParams = {
  campaignId: string;
  userId: string;
};

export const useCampaignsMutations = () => {
  const campaignService = new CampaignService(http);
  const queryClient = useQueryClient();

  const registerContributor = useMutation<
    void,
    unknown,
    CampaignMutationParams
  >({
    mutationFn: (campaign: CampaignMutationParams) => {
      const { campaignId, userId } = campaign;
      return campaignService.registerContributor(campaignId, userId);
    },
    onSuccess: (_data, variables) => {
      toast.success("You have been registered to the campaign successfully");
      queryClient.invalidateQueries({
        queryKey: ["campaign-contributors", variables.campaignId],
      });
    },
    onError: (err: unknown) => {
      const message =
        (err as Error)?.message || "Failed to register contributor";
      toast.error(message);
    },
  });

  return {
    registerContributor: registerContributor.mutate,
  };
};
