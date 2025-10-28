import { Badge } from "@/components/ui/badge";
import { GitFork, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubRepository } from "@/types/github.type";
import type { ReactNode } from "react";

export const RepositoryCard = ({
  repository,
  rightExtra,
}: {
  repository: GitHubRepository;
  rightExtra?: ReactNode;
}) => {
  return (
    <div
      key={repository.id}
      className="relative h-full rounded-xl border p-4 hover:bg-accent/40 transition-all hover:-translate-y-0.5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Image
            src={repository.owner?.avatar_url}
            alt={repository.full_name}
            width={28}
            height={28}
            className="rounded"
          />
          <div className="min-w-0">
            <Link
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline truncate block"
            >
              {repository.full_name ?? repository.name}
            </Link>
            {repository.description ? (
              <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
                {repository.description}
              </p>
            ) : (
              <div className="min-h-8" />
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2 min-h-[28px]">
              {repository.language && (
                <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">
                  {repository.language}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="gap-1 px-2 py-0.5 text-[10px]"
              >
                <Star className="h-3 w-3" /> {repository.stargazers_count}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1 px-2 py-0.5 text-[10px]"
              >
                <GitFork className="h-3 w-3" /> {repository.forks_count}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1 px-2 py-0.5 text-[10px]"
              >
                <MessageSquare className="h-3 w-3" />{" "}
                {repository.open_issues_count}
              </Badge>

              <div className="flex my-2">{rightExtra}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
