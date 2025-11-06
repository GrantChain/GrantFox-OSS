import { useQuery } from "@tanstack/react-query";
import { CampaignWithProjectsAndRepos } from "@/types/campaign.type";
import { CampaignService } from "../services/campaign.service";
import { http } from "@/lib/http";

export const useCampaignDetailsQuery = (id?: string) => {
  const campaignService = new CampaignService(http);

  const query = useQuery<CampaignWithProjectsAndRepos>({
    queryKey: ["campaign", id],
    queryFn: () => campaignService.getCampaignWithProjectsAndRepos(id!),
    enabled: Boolean(id),
  });

  return query;
};
