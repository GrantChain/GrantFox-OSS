import { useState } from "react";
import { useCampaignContext } from "@/context/CampaignContext";
import { useGithubUsersQuery } from "@/features/users/hooks/useGithubUsers";
import CampaignHero from "../components/CampaignHero";
import CampaignTags from "../components/CampaignTags";
import CampaignTimeRemaining from "../components/CampaignTimeRemaining";
import CampaignReposAndContributors from "../components/CampaignReposAndContributors";
import { useCampaignQuery } from "../hooks/useCampaignQuery";
import { Card } from "@/components/ui/card";
import { FileIcon } from "lucide-react";

export default function CampaignView() {
  const githubUserService = useGithubUsersQuery();
  const { activeCampaign } = useCampaignContext();
  const { data } = useCampaignQuery({
    campaignId: activeCampaign?.campaign_id,
  });

  return (
    <main className="container mx-auto px-4 py-8">
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
            contributorsCount={data?.length ?? 0}
          />
          <CampaignTags tags={activeCampaign?.tags ?? []} />
          <CampaignTimeRemaining startDate={activeCampaign?.start_date} />
          <CampaignReposAndContributors
            activeCampaign={activeCampaign ?? null}
            contributors={githubUserService.data}
          />
        </>
      )}
    </main>
  );
}
