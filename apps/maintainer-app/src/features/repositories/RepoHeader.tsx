"use client";

import { Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Repository } from "@/types/github.type";

interface RepoHeaderProps {
  repo: Repository;
}

export const RepoHeader = ({ repo }: RepoHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Title and Description */}
      <div>
        <h1 className="text-3xl font-bold">{repo.name}</h1>
        {repo.description && (
          <p className="text-muted-foreground mt-2">{repo.description}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="flex items-center justify-end gap-2">
        <Button className="border-0 py-1 h-8" variant="outline">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />

            <p className="text-base font-semibold text-foreground">
              {repo.stargazers_count?.toLocaleString()}
            </p>
          </div>
        </Button>

        <Button className="border-0 py-1 h-8" variant="outline">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-muted-foreground" />

            <p className="text-base font-semibold text-foreground">
              {repo.forks_count?.toLocaleString()}
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};
