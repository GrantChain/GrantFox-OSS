import { useQuery } from "@tanstack/react-query";
import { Campaign } from "@/types/campaign.type";
import { CampaignService } from "../services/campaign.service";
import { http } from "@/lib/http";

export const useActiveCampaignsWithProjectsQuery = () => {
  const campaignService = new CampaignService(http);

  const query = useQuery<Campaign[]>({
    queryKey: ["active-campaigns-with-projects"],
    queryFn: () => campaignService.getActiveCampaignsWithProjects(),
  });

  return query;
};
