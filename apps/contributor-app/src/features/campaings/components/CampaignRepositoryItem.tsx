"use client";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import type { Repository } from "@/types/repositories.type";
import Link from "next/link";

interface CampaignRepositoryItemProps {
  repo: Repository;
}

function parseGitHubOrgAndRepo(
  url: string
): { org: string; repo: string } | null {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    if (segments.length >= 2) {
      return { org: segments[0]!, repo: segments[1]! };
    }
    return null;
  } catch {
    return null;
  }
}

const CampaignRepositoryItem = ({ repo }: CampaignRepositoryItemProps) => {
  const parsed = parseGitHubOrgAndRepo(repo.github_url);
  const isInternal = Boolean(parsed);
  const href = parsed
    ? `/org/${parsed.org}/repo/${parsed.repo}`
    : repo.github_url;

  return (
    <Link
      href={href}
      {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div
        className={cn(
          "w-full group rounded-xl p-4 border border-black/5 text-base text-white transition-all ease-in hover:cursor-pointer dark:border-white/5"
        )}
      >
        <AnimatedShinyText className="mx-0 max-w-none w-full gap-5 flex flex-col items-start justify-start px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h4 className="text-black text-lg font-medium dark:text-white">
                {repo.name}
              </h4>
            </div>
          </div>
          <p>{repo.description}</p>
        </AnimatedShinyText>
      </div>
    </Link>
  );
};

export default CampaignRepositoryItem;
