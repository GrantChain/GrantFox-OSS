import { useMemo } from "react";
import { CampaignWithProjectsAndRepos } from "@/types/campaign.type";

type RepositoryGrowthPoint = {
  date: string;
  repositories: number;
};

type TechStackPoint = {
  tech: string;
  projects: number;
};

type CategoryPoint = {
  category: string;
  count: number;
  fill: string;
};

type ReposPerProjectPoint = {
  name: string;
  repositories: number;
};

type MaintainersPerProjectPoint = {
  name: string;
  maintainers: number;
};

export type DashboardMetrics = {
  repositoryGrowth: RepositoryGrowthPoint[];
  techStackData: TechStackPoint[];
  categoryData: CategoryPoint[];
  reposPerProject: ReposPerProjectPoint[];
  maintainersPerProject: MaintainersPerProjectPoint[];
  totalMaintainers: number;
  totalContributors: number;
};

export function useDashboardMetrics(
  data: CampaignWithProjectsAndRepos
): DashboardMetrics {
  return useMemo(() => {
    const repoTimeline = data.projects
      .flatMap((project) =>
        project.repositories.map((repo) => ({
          date: new Date(repo.added_to_campaign_at ?? ""),
          name: repo.name,
        }))
      )
      .filter((r) => !isNaN(r.date.getTime()))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const repositoryGrowth: RepositoryGrowthPoint[] = repoTimeline.map(
      (_, index) => ({
        date: repoTimeline[index].date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        repositories: index + 1,
      })
    );

    const techStackMap = new Map<string, number>();
    data.projects.forEach((project) => {
      project.tech_stack.forEach((tech) => {
        techStackMap.set(tech, (techStackMap.get(tech) || 0) + 1);
      });
    });
    const techStackData: TechStackPoint[] = Array.from(techStackMap.entries())
      .map(([tech, count]) => ({ tech, projects: count }))
      .sort((a, b) => b.projects - a.projects)
      .slice(0, 8);

    const categoryMap = new Map<string, number>();
    data.projects.forEach((project) => {
      categoryMap.set(
        project.category,
        (categoryMap.get(project.category) || 0) + 1
      );
    });
    const categoryData: CategoryPoint[] = Array.from(categoryMap.entries()).map(
      ([category, count], index) => ({
        category,
        count,
        fill: `var(--chart-${(index % 5) + 1})`,
      })
    );

    const reposPerProject: ReposPerProjectPoint[] = data.projects
      .map((project) => ({
        name: project.name,
        repositories: project.repositories.length,
      }))
      .sort((a, b) => b.repositories - a.repositories)
      .slice(0, 6);

    const maintainersPerProject: MaintainersPerProjectPoint[] = data.projects
      .map((project) => ({
        name: project.name,
        maintainers: project.maintainers.length,
      }))
      .sort((a, b) => b.maintainers - a.maintainers)
      .slice(0, 6);

    const uniqueMaintainerUsernames = new Set<string>();
    data.projects.forEach((project) => {
      project.maintainers.forEach((maintainer) => {
        if (maintainer.username) {
          uniqueMaintainerUsernames.add(maintainer.username);
        }
      });
    });
    const totalMaintainers = uniqueMaintainerUsernames.size;

    return {
      repositoryGrowth,
      techStackData,
      categoryData,
      reposPerProject,
      maintainersPerProject,
      totalMaintainers,
      totalContributors: data.total_contributors,
    };
  }, [data]);
}
