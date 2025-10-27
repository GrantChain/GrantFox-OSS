"use client";

import Link from "next/link";
import type { Repository } from "@/types/repositories.type";
import { ShineBorder } from "../ui/shine-border";
import Image from "next/image";

interface RepositoryCardProps {
  repo: Repository;
  org: string;
}

export const RepositoryCard = ({ repo, org }: RepositoryCardProps) => {
  return (
    <div
      key={repo.github_repo_id}
      className="relative rounded-xl border p-4 hover:bg-accent/40 transition-colors"
    >
      <ShineBorder
        className="pointer-events-none"
        shineColor={["#7c3aed33", "#22d3ee33"]}
      />
      <div className="flex justify-between items-center gap-3 min-w-0">
        <div className="flex items-center gap-3">
          <Image
            width={32}
            height={32}
            src={`https://github.com/${org}.png`}
            alt={repo.name}
            className="size-8 rounded-full"
          />
          <div className="min-w-0">
            <Link
              href={`/campaigns/org/${org}/repo/${repo.name}`}
              className="font-medium hover:underline truncate block"
            >
              {`${org}/${repo.name}`}
            </Link>

            {repo.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {repo.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
