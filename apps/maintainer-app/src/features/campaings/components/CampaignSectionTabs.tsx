"use client";

import { cn } from "@/lib/utils";

type TabKey = "repositories" | "projects";

interface CampaignSectionTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  projectsCount?: number;
  repositoriesCount?: number;
}

export const CampaignSectionTabs = ({
  active,
  onChange,
  projectsCount = 0,
  repositoriesCount = 0,
}: CampaignSectionTabsProps) => {
  return (
    <div className="w-full flex justify-start items-center gap-3">
      <button
        className={cn(
          "cursor-pointer p-2 inline-flex items-center gap-2",
          active === "projects" && "border-b-2 border-orange-500"
        )}
        onClick={() => onChange("projects")}
      >
        Projects
        <span className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[11px] w-6 h-6">
          {projectsCount}
        </span>
      </button>
      |{" "}
      <button
        className={cn(
          "cursor-pointer p-2 inline-flex items-center gap-2",
          active === "repositories" && "border-b-2 border-orange-500"
        )}
        onClick={() => onChange("repositories")}
      >
        Repositories
        <span className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[11px] w-6 h-6">
          {repositoriesCount}
        </span>
      </button>
    </div>
  );
};
