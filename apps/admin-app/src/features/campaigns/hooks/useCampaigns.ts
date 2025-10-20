import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { campaignSchema } from "../schemas/campaign.schema";
import { z } from "zod";
import { useCampaignContext } from "@/context/CampaignContext";
import { useCampaignsMutations } from "./useCampaignsMutations";
import { CampaignPayload } from "@/types/campaign.type";

export type CampaignFormValues = z.infer<typeof campaignSchema>;

type UseCampaignsOptions = {
  mode?: "create" | "edit";
  file?: File | null;
  onSuccess?: () => void;
};

export const useCampaigns = (options?: UseCampaignsOptions) => {
  const { campaign } = useCampaignContext();
  const { createCampaign, updateCampaign } = useCampaignsMutations();
  const isEdit = (options?.mode ?? "create") === "edit";

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: campaign?.name ?? "",
      description: campaign?.description ?? "",
      tags: campaign?.tags ?? [],
      start_date: campaign?.start_date ?? "",
      end_date: campaign?.end_date ?? "",
      image_url: campaign?.image_url ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CampaignFormValues) => {
    const hasFile = Boolean(options?.file);
    let payload: CampaignPayload | FormData;
    if (hasFile) {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("description", values.description);
      (values.tags ?? []).forEach((t, i) => fd.append(`tags[${i}]`, t));
      if (values.start_date) fd.append("start_date", values.start_date);
      if (values.end_date) fd.append("end_date", values.end_date);
      if (options?.file) fd.append("image", options.file);
      payload = fd;
    } else {
      payload = {
        ...values,
        start_date: values.start_date,
        end_date: values.end_date,
        image_url: isEdit ? (campaign?.image_url ?? "") : values.image_url,
      } as CampaignPayload;
    }

    await new Promise<void>((resolve) => {
      if (isEdit) {
        if (!campaign?.campaign_id) return resolve();
        updateCampaign(
          { id: campaign.campaign_id, campaign: payload },
          {
            onSuccess: () => {
              options?.onSuccess?.();
              resolve();
            },
            onError: () => resolve(),
          }
        );
      } else {
        createCampaign(payload, {
          onSuccess: () => {
            options?.onSuccess?.();
            resolve();
          },
          onError: () => resolve(),
        });
      }
    });
  };

  return {
    form,
    onSubmit,
  };
};
