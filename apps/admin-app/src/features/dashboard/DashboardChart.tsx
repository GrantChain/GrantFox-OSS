"use client";

import { CampaignWithProjectsAndRepos } from "@/types/campaign.type";
import { useDashboardMetrics } from "./hooks/useDashboardMetrics";
import { StatsOverview } from "./StatsOverview";
import { RepositoryGrowthChart } from "./RepositoryGrowthChart";
import { CategoryDistributionPie } from "./CategoryDistributionPie";
import { TechStackBar } from "./TechStackBar";
import { ReposPerProjectBar } from "./ReposPerProjectBar";
import { ContributorsTimelineArea } from "./ContributorsTimelineArea";

export function DashboardCharts({
  data,
}: {
  data: CampaignWithProjectsAndRepos;
}) {
  const chartData = useDashboardMetrics(data);

  return (
    <div className="space-y-6">
      <StatsOverview
        totalProjects={data.total_projects}
        totalRepositories={data.total_repositories}
        totalMaintainers={chartData.totalMaintainers}
        totalContributors={chartData.totalContributors}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        <ContributorsTimelineArea
          contributors={data.campaign.contributors}
          className="md:col-span-2 lg:col-span-12 xl:col-span-12 overflow-hidden"
        />
        <RepositoryGrowthChart data={chartData.repositoryGrowth} />

        <CategoryDistributionPie
          data={chartData.categoryData}
          totalProjects={data.total_projects}
          className="lg:col-span-5 xl:col-span-4 md:col-span-6 overflow-hidden"
        />

        <TechStackBar
          data={chartData.techStackData}
          className="lg:col-span-6 md:col-span-6 overflow-hidden"
        />

        <ReposPerProjectBar
          data={chartData.reposPerProject}
          className="lg:col-span-6 md:col-span-6 overflow-hidden"
        />
      </div>
    </div>
  );
}
