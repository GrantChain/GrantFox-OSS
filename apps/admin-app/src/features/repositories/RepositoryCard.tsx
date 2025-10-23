import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GitHubRepository } from "@/types/github.type";
import { Repository } from "@/types/repository.type";
import { GitFork, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const RepositoryCard = ({
  repository,
  rightExtra,
}: {
  repository: Repository;
  rightExtra?: ReactNode;
}) => {
  return (
    <Link
      href={repository.github_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card
        key={repository.github_repo_id}
        className="relative rounded-xl border p-4 hover:bg-accent/40 transition-all hover:-translate-y-0.5 shadow-sm mb-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 min-w-0">
            <div className="min-w-0">
              {repository.name}

              {repository.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {repository.description}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="flex my-2">{rightExtra}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
