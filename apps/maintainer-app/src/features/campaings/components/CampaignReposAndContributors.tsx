"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Campaign } from "@/types/campaign.type";
import type { ApiUser } from "@/types/user.type";
import CampaignSectionTabs from "./CampaignSectionTabs";
import CampaignRepositoriesList from "./CampaignRepositoriesList";
import CampaignContributorsGrid from "./CampaignContributorsGrid";
import CampaignProjectsList from "@/features/campaings/components/CampaignProjectsList";
import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "../services/campaign.service";
import { http } from "@/lib/api";

interface CampaignReposAndContributorsProps {
  activeCampaign: Campaign | null;
  contributors: ApiUser[] | undefined;
}

const CampaignReposAndContributors = ({
  activeCampaign,
  contributors,
}: CampaignReposAndContributorsProps) => {
  const [sectionActive, setSectionActive] = useState({
    repositories: true,
    contributors: false,
    projects: false,
  });
  const activeTab: "repositories" | "contributors" | "projects" =
    useMemo(() => {
      if (sectionActive.repositories) return "repositories";
      if (sectionActive.contributors) return "contributors";
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
      <CampaignSectionTabs
        active={activeTab}
        onChange={(tab) =>
          setSectionActive({
            repositories: tab === "repositories",
            contributors: tab === "contributors",
            projects: tab === "projects",
          })
        }
      />
      <div className="relative max-h-[50rem] overflow-hidden overflow-y-auto w-full flex flex-col gap-8 rounded-2xl border-2 p-5 bg-gradient-to-b from-background/40 to-background/10">
        {activeTab === "repositories" && activeCampaign?.repositories && (
          <CampaignRepositoriesList
            repositories={activeCampaign.repositories}
          />
        )}
        {activeTab === "contributors" && contributors && (
          <CampaignContributorsGrid users={contributors} />
        )}
        {activeTab === "projects" && campaignWithProjects?.projects && (
          <CampaignProjectsList projects={campaignWithProjects.projects} />
        )}
      </div>
    </section>
  );
};

export default CampaignReposAndContributors;
