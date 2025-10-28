"use client";

import { useCampaignContext } from "@/context/CampaignContext";
import { CampaignHero } from "../components/CampaignHero";
import { CampaignTags } from "../components/CampaignTags";
import { CampaignTimeRemaining } from "../components/CampaignTimeRemaining";
import { CampaignReposAndContributors } from "../components/CampaignReposAndContributors";
import { useCampaignQuery } from "../hooks/useCampaignQuery";
import { Card } from "@/components/ui/card";
import { FileIcon } from "lucide-react";

export const CampaignView = () => {
  const { activeCampaign } = useCampaignContext();
  const { data: contributors } = useCampaignQuery({
    campaignId: activeCampaign?.campaign_id,
  });

  return (
    <>
      {!activeCampaign ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            No active campaign found
          </span>
        </Card>
      ) : (
        <>
          <CampaignHero
            activeCampaign={activeCampaign}
            contributorsCount={contributors?.length ?? 0}
            contributors={contributors}
          />
          <CampaignTags tags={activeCampaign?.tags ?? []} />
          <CampaignTimeRemaining
            startDate={activeCampaign?.start_date}
            endDate={activeCampaign?.end_date}
          />
          <CampaignReposAndContributors
            activeCampaign={activeCampaign ?? null}
          />
        </>
      )}
    </>
  );
};
