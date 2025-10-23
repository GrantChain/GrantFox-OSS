import { useState } from "react";
import { useCampaignContext } from "@/context/CampaignContext";
import { useGithubUsersQuery } from "@/features/users/hooks/useGithubUsers";
import CampaignHero from "../components/CampaignHero";
import CampaignTags from "../components/CampaignTags";
import CampaignTimeRemaining from "../components/CampaignTimeRemaining";
import CampaignReposAndContributors from "../components/CampaignReposAndContributors";
import LoadingText from "@/components/shared/LoadingText";
import { useCampaignQuery } from "../hooks/useCampaignQuery";

export default function CampaignView() {
  const githubUserService = useGithubUsersQuery();
  const { activeCampaign } = useCampaignContext();
  const { data } = useCampaignQuery({ campaignId: activeCampaign?.campaign_id});
  console.log({ activeCampaign })
  return (
    <main className="container mx-auto px-4 py-8">
      {!activeCampaign ? (
        <div className="flex min-h-[60vh] w-full items-center justify-center">
          <LoadingText />
        </div>
      ) : (
        <>
          <CampaignHero activeCampaign={activeCampaign} contributorsCount={data?.length ?? 0} />
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
