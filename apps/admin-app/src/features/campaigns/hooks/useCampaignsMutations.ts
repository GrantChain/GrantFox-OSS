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
      const axiosErr = (err as AxiosError) ?? (err as any)?.cause;
      const apiMessage =
        (axiosErr as any)?.response?.data?.message ??
        (err as any)?.cause?.response?.data?.message;

      const text = Array.isArray(apiMessage)
        ? apiMessage.join(", ")
        : (apiMessage as string | undefined);

      let message = (err as Error)?.message || "Failed to create campaign";
      if (text) {
        const t = String(text);
        if (/upcom/i.test(t)) {
          message = "There is already an UPCOMMING campaign";
        } else if (/active/i.test(t)) {
          message = "There is already an ACTIVE campaign";
        } else {
          message = t;
        }
      }

      toast.error(message);
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
      const axiosErr = (err as AxiosError) ?? (err as any)?.cause;
      const apiMessage =
        (axiosErr as any)?.response?.data?.message ??
        (err as any)?.cause?.response?.data?.message;

      const text = Array.isArray(apiMessage)
        ? apiMessage.join(", ")
        : (apiMessage as string | undefined);

      let message = "Failed to update campaign";
      if (text) {
        const t = String(text);
        if (/upcom/i.test(t)) {
          message = "Only one ACTIVE or UPCOMING campaign is allowed at a time";
        } else if (/active/i.test(t)) {
          message = "Only one ACTIVE or UPCOMING campaign is allowed at a time";
        } else {
          message = t;
        }
      }

      toast.error(message);
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
      const axiosErr = (err as AxiosError) ?? (err as any)?.cause;
      const apiMessage =
        (axiosErr as any)?.response?.data?.message ??
        (err as any)?.cause?.response?.data?.message;

      const text = Array.isArray(apiMessage)
        ? apiMessage.join(", ")
        : (apiMessage as string | undefined);

      let message = "Failed to update status";
      if (text) {
        const t = String(text);
        if (/upcom/i.test(t)) {
          message = "Only one ACTIVE or UPCOMING campaign is allowed at a time";
        } else if (/active/i.test(t)) {
          message = "Only one ACTIVE or UPCOMING campaign is allowed at a time";
        } else {
          message = t;
        }
      }

      toast.error(message);
    },
  });

  return {
    createCampaign: createCampaignMutation.mutate,
    updateCampaign: updateCampaignMutation.mutate,
    updateCampaignStatus: updateCampaignStatusMutation.mutate,
  };
};
