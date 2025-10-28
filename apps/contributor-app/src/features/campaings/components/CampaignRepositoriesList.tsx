"use client";

import type { Repository } from "@/types/repositories.type";
import { RepositoryCard } from "@/components/shared/RepositoryCard";

interface CampaignRepositoriesListProps {
  repositories: Repository[];
  org?: string;
}

export const CampaignRepositoriesList = ({
  repositories,
  org = undefined,
}: CampaignRepositoriesListProps) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {repositories.length > 0 ? (
        repositories.map((repo) => (
          <RepositoryCard key={repo.github_repo_id} repo={repo} org={org} />
        ))
      ) : (
        <p className="text-muted-foreground">No repositories found</p>
      )}
    </div>
  );
};
