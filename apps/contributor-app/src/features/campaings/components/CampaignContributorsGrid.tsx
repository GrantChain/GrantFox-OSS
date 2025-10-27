"use client";

import { GithubUserCard } from "@/components/shared/GithubUserCard";
import type { ApiUser } from "@/types/user.type";

interface CampaignContributorsGridProps {
  users: ApiUser[];
}

const CampaignContributorsGrid = ({ users }: CampaignContributorsGridProps) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {users.length > 0 ? (
        users.map((user) => <GithubUserCard user={user} key={user.user_id} />)
      ) : (
        <p className="text-muted-foreground">No contributors found</p>
      )}
    </div>
  );
};

export default CampaignContributorsGrid;
