"use client";

import type { Repository } from "@/types/repositories.type";
import CampaignRepositoryItem from "./CampaignRepositoryItem";

interface CampaignRepositoriesListProps {
  repositories: Repository[];
}

const CampaignRepositoriesList = ({
  repositories,
}: CampaignRepositoriesListProps) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {repositories.length > 0 ? (
        repositories.map((repo) => (
          <CampaignRepositoryItem key={repo.github_repo_id} repo={repo} />
        ))
      ) : (
        <p className="text-muted-foreground">No repositories found</p>
      )}
    </div>
  );
};

export default CampaignRepositoriesList;
