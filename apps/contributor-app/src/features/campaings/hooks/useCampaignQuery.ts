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

  const query = useQuery<ApiUser[]>({
    queryKey: ["github-users-by-role"],
    queryFn: () => campaignService.getContributorsCampaign(campaignId!),
  });

  return query;
};
