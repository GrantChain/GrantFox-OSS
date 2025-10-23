import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { CampaignService } from "../services/campaign.service";
import { ApiUser } from "@/types/user.type";

type UseCampaignQueryOptions = {
  campaignId?: string | null;
};

export const useCampaignQuery = (options: UseCampaignQueryOptions) => {
  const { campaignId } = options;

  const campaignService = new CampaignService(http);

  const isEnabled = typeof campaignId === "string" && campaignId.length > 0;

  const query = useQuery<ApiUser[]>({
    queryKey: ["campaign-contributors", campaignId],
    enabled: isEnabled,
    queryFn: async () => {
      if (!isEnabled || !campaignId) return [];
      return campaignService.getContributorsCampaign(campaignId);
    },
  });

  return query;
};
