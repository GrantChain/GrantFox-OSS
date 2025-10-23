import { http } from "@/lib/http";
import { CampaignService } from "../services/campaign.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CampaignPayload, CampaignStatus } from "@/types/campaign.type";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useCampaignsMutations = () => {
  const campaignService = new CampaignService(http);
  const queryClient = useQueryClient();

  const createCampaignMutation = useMutation({
    mutationFn: (campaign: CampaignPayload | FormData) =>
      campaignService.createCampaign(campaign),
    onSuccess: () => {
      toast.success("Campaign created successfully");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({
        queryKey: ["active-campaigns-with-projects"],
      });
    },
    onError: (err: unknown) => {
      console.log(err);
      toast.error("Failed to create campaign");
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: ({
      id,
      campaign,
    }: {
      id: string;
      campaign: CampaignPayload | FormData;
    }) => campaignService.updateCampaign(id, campaign),
    onSuccess: () => {
      toast.success("Campaign updated successfully");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (err: unknown) => {
      console.log(err);
      toast.error("Failed to update campaign");
    },
  });

  const updateCampaignStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CampaignStatus }) =>
      campaignService.updateCampaignStatus(id, status),
    onSuccess: () => {
      toast.success("Campaign status updated");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (err: unknown) => {
      console.log(err);
      toast.error("Failed to update campaign status");
    },
  });

  return {
    createCampaign: createCampaignMutation.mutate,
    updateCampaign: updateCampaignMutation.mutate,
    updateCampaignStatus: updateCampaignStatusMutation.mutate,
  };
};
