import http from "@/lib/http";
import { CampaignService } from "../services/campaign.service";
import { useMutation } from "@tanstack/react-query";
import { Campaign } from "@/types/campaign.type";
import { toast } from "sonner";

export const useCampaignsMutations = () => {
  const campaignService = new CampaignService(http);

  const createCampaignMutation = useMutation({
    mutationFn: (campaign: Campaign) =>
      campaignService.createCampaign(campaign),
    onSuccess: () => {
      toast.success("Campaign created successfully");
    },
    onError: () => {
      toast.error("Failed to create campaign");
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: ({ id, campaign }: { id: string; campaign: Campaign }) =>
      campaignService.updateCampaign(id, campaign),
    onSuccess: () => {
      toast.success("Campaign updated successfully");
    },
    onError: () => {
      toast.error("Failed to update campaign");
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: (id: string) => campaignService.deleteCampaign(id),
    onSuccess: () => {
      toast.success("Campaign deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete campaign");
    },
  });

  return {
    createCampaign: createCampaignMutation.mutate,
    updateCampaign: updateCampaignMutation.mutate,
    deleteCampaign: deleteCampaignMutation.mutate,
  };
};
