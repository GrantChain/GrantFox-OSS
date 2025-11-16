"use client";

import { useCampaignContext } from "@/context/CampaignContext";
import { CampaignHero } from "../components/CampaignHero";
import { CampaignTags } from "../components/CampaignTags";
import { CampaignTimeRemaining } from "../components/CampaignTimeRemaining";
import { useCampaignQuery } from "../hooks/useCampaignQuery";
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { CampaignAndRepos } from "../components/CampaignAndRepos";

export const CampaignView = () => {
  const { activeCampaign, upcomingCampaign, isLoading } = useCampaignContext();

  const campaign = activeCampaign ?? upcomingCampaign;

  const isUpcoming = !activeCampaign && upcomingCampaign !== null;

  const { data: contributors } = useCampaignQuery({
    campaignId: campaign?.campaign_id,
  });

  return (
    <>
      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading campaign…
          </span>
        </Card>
      ) : !campaign ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            No campaign found
          </span>
        </Card>
      ) : (
        <>
          <CampaignHero
            activeCampaign={campaign}
            isUpcoming={isUpcoming}
            contributors={contributors}
          />
          <CampaignTags tags={campaign?.tags ?? []} />
          <CampaignTimeRemaining
            startDate={campaign?.start_date}
            endDate={campaign?.end_date}
          />
          <CampaignAndRepos activeCampaign={campaign ?? null} />
        </>
      )}
    </>
  );
};
