"use client";

import { cn, timeAgo } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { useQueries } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { GitHubOrgsService } from "@/features/github/services/GitHubOrgsService";
import Image from "next/image";
import { Repository } from "@/types";
import { CURATED_ORG_LOGINS } from "@/config/curation";

interface RepoItemData {
  name: string;
  description: string;
  avatarUrl: string;
  time: string;
}

const orgsService = new GitHubOrgsService(githubHttp);

const Repo = ({ name, description, avatarUrl, time }: RepoItemData) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl overflow-hidden bg-card border">
          <Image src={avatarUrl} alt={name} width={40} height={40} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function RepoList({
  className,
  orgLogins,
}: {
  className?: string;
  orgLogins?: string[];
}) {
  const fallbacks = CURATED_ORG_LOGINS;
  const targets = (
    orgLogins && orgLogins.length > 0 ? orgLogins : fallbacks
  ).slice(0, 5);

  const queries = useQueries({
    queries: targets.map((org) => ({
      queryKey: ["gh", "org-repos", org, { per_page: 40 }],
      queryFn: () => orgsService.listOrgRepos(org, { per_page: 20 }),
      staleTime: 60_000,
    })),
  });

  const repos: Repository[] = queries
    .map((q) => (Array.isArray(q.data) ? (q.data as Repository[]) : []))
    .flat();

  const items: RepoItemData[] = repos.map((r) => ({
    name: r.full_name ?? r.name,
    description: r.description ?? "",
    avatarUrl: r.owner?.avatar_url ?? "/favicon.ico",
    time: r.created_at ? timeAgo(r.created_at) : "",
  }));

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full sm:w-1/2 flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {items.map((item, idx) => (
          <Repo {...item} key={idx} />
        ))}
      </AnimatedList>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
}
