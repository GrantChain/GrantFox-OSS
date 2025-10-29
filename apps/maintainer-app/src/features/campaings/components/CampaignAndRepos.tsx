"use client";

import { useMemo, useState } from "react";
import type { Campaign } from "@/types/campaign.type";
import { CampaignSectionTabs } from "./CampaignSectionTabs";
import { CampaignProjectsList } from "@/features/campaings/components/CampaignProjectsList";
import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "../services/campaign.service";
import { http } from "@/lib/api";
import { CampaignRepositoriesList } from "./CampaignRepositoriesList";
import Link from "next/link";
import { PulsatingButton } from "@/components/ui/pulsating-button";

interface CampaignAndReposProps {
  activeCampaign: Campaign | null;
}

export const CampaignAndRepos = ({ activeCampaign }: CampaignAndReposProps) => {
  const [sectionActive, setSectionActive] = useState({
    repositories: false,
    projects: true,
  });
  const activeTab: "repositories" | "projects" = useMemo(() => {
    if (sectionActive.repositories) return "repositories";
    return "projects";
  }, [sectionActive]);

  const service = useMemo(() => new CampaignService(http), []);
  const { data: campaignWithProjects } = useQuery({
    queryKey: [
      "campaign",
      "active",
      activeCampaign?.campaign_id,
      "with-projects-repos",
    ],
    queryFn: () =>
      service.getActiveCampaignWithProjectsAndRepos({
        campaign_id: activeCampaign?.campaign_id as string,
      }),
    enabled: Boolean(activeCampaign?.campaign_id),
    staleTime: 60_000,
  });

  return (
    <section className="w-full flex flex-col gap-4 justify-start items-center">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start w-full gap-6 sm:gap-0">
        <CampaignSectionTabs
          active={activeTab}
          onChange={(tab) =>
            setSectionActive({
              repositories: tab === "repositories",
              projects: tab === "projects",
            })
          }
          projectsCount={campaignWithProjects?.projects?.length ?? 0}
          repositoriesCount={activeCampaign?.repositories?.length ?? 0}
        />

        <Link href={`/maintainer/projects`} className="flex-shrink-0">
          <PulsatingButton className="whitespace-nowrap">
            Add your Project
          </PulsatingButton>
        </Link>
      </div>

      <div className="relative max-h-[50rem] overflow-hidden overflow-y-auto w-full flex flex-col gap-8 rounded-2xl border-2 p-5 bg-gradient-to-b from-background/40 to-background/10">
        {activeTab === "repositories" && activeCampaign?.repositories && (
          <CampaignRepositoriesList
            repositories={activeCampaign.repositories}
          />
        )}
        {activeTab === "projects" && campaignWithProjects?.projects && (
          <CampaignProjectsList projects={campaignWithProjects.projects} />
        )}
      </div>
    </section>
  );
};
