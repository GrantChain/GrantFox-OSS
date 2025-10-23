"use client"

import type { Repository } from "@/types/repositories.type"
import CampaignRepositoryItem from "./CampaignRepositoryItem"

interface CampaignRepositoriesListProps {
  repositories: Repository[]
}

const CampaignRepositoriesList = ({ repositories }: CampaignRepositoriesListProps) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {repositories.map((repo) => (
        <CampaignRepositoryItem key={repo.github_repo_id} repo={repo} />
      ))}
    </div>
  )
}

export default CampaignRepositoriesList
