import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { campaignSchema } from "../schemas/campaign.schema";
import { z } from "zod";
import { useCampaignContext } from "@/context/CampaignContext";

export const useCampaigns = () => {
  const { campaign } = useCampaignContext();

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: campaign?.title,
      description: campaign?.description,
      image: campaign?.image,
    },
    mode: "onChange",
  });

  return {
    form,
  };
};
