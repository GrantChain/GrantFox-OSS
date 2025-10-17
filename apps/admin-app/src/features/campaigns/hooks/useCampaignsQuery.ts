import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "../services/campaign.service";
import http from "@/lib/http";

export const useCampaignsQuery = () => {
  const campaignService = new CampaignService(http);

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignService.getCampaigns(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
