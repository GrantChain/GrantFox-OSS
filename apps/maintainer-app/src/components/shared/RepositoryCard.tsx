"use client";

import Link from "next/link";
import type { Repository } from "@/types/repositories.type";
import { ShineBorder } from "../ui/shine-border";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RepositoryCardProps {
  repo: Repository;
  org?: string;
  className?: string;
}

export const RepositoryCard = ({
  repo,
  org,
  className,
}: RepositoryCardProps) => {
  const organization = org ?? repo.github_url.split("/")[3];

  return (
    <div
      key={repo.github_repo_id}
      className={cn(
        "relative rounded-xl border p-4 hover:bg-accent/40 transition-colors",
        className
      )}
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
            src={`https://github.com/${organization}.png`}
            alt={repo.name}
            className="size-8 rounded-full"
          />
          <div className="min-w-0">
            <Link
              href={repo.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline truncate block"
            >
              {`${organization}/${repo.name}`}
            </Link>

            {repo.description ? (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {repo.description}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground line-clamp-2">
                No description provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
