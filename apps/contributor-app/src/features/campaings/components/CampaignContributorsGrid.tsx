"use client"

import { GithubUserCard } from "@/components/shared/GithubUser"
import type { ApiUser } from "@/types/user.type"

interface CampaignContributorsGridProps {
  users: ApiUser[]
}

const CampaignContributorsGrid = ({ users }: CampaignContributorsGridProps) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <GithubUserCard
          key={user.user_id}
          img={user.avatar_url ?? "https://avatars.githubusercontent.com/u/178688063?v=4"}
          name={user.username ?? "Unknown"}
          username={user.username ?? "unknown"}
          body={"This a short bio about the user."}
        />
      ))}
    </div>
  )
}

export default CampaignContributorsGrid
