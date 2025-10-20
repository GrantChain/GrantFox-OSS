import { useQuery } from "@tanstack/react-query";
import { Campaign } from "@/types/campaign.type";
import { CampaignService } from "../services/campaign.service";
import { http } from "@/lib/http";

export const useCampaignDetailsQuery = (id?: string) => {
  const campaignService = new CampaignService(http);

  const query = useQuery<Campaign>({
    queryKey: ["campaign", id],
    queryFn: () => campaignService.getCampaignWithProjectsAndRepos(id!),
    enabled: Boolean(id),
  });

  return query;
};
