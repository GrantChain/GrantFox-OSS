"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { AnimatedList } from "../AnimatedList";
import { useCampaignContext } from "@/context/CampaignContext";
import { useCampaignQuery } from "@/features/campaings/hooks/useCampaignQuery";
import { MarqueeContributors } from "../MarqueeContributors";
import { CampaignCard } from "@/features/projects/components/CampaignCard";

export const LandingView = () => {
  const { activeCampaign, finishedCampaign, upcomingCampaign } =
    useCampaignContext();

  const { data: contributors } = useCampaignQuery({
    campaignId: activeCampaign?.campaign_id,
  });

  return (
    <>
      <DotPattern
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        opacity={0.3}
      />
      <main className="relative mx-auto min-h-[calc(100vh-56px)] w-full max-w-6xl px-4 py-10">
        <section className="relative z-10 mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <section className="relative z-10 flex flex-col items-start gap-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-7xl">
              Submit your project for Stellar approval
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground text-xl">
              Create your project, register your repositories to campaigns, and
              become eligible for funding.
            </p>

            {activeCampaign && (
              <CampaignCard
                title="Current Campaign"
                campaign={activeCampaign}
              />
            )}
            {upcomingCampaign && (
              <CampaignCard
                title="Upcoming Campaign"
                campaign={upcomingCampaign}
              />
            )}
            {finishedCampaign && (
              <CampaignCard
                title="Finished Campaign"
                campaign={finishedCampaign}
              />
            )}
          </section>

          <AnimatedList repositories={activeCampaign?.repositories ?? []} />
        </section>

        <MarqueeContributors contributors={contributors ?? []} />
      </main>
    </>
  );
};
