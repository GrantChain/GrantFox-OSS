"use client";

import { cn } from "@/lib/utils";

type TabKey = "repositories" | "projects";

interface CampaignSectionTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export const CampaignSectionTabs = ({
  active,
  onChange,
}: CampaignSectionTabsProps) => {
  return (
    <div className="w-full flex justify-start items-center gap-3">
      <button
        className={cn(
          "cursor-pointer p-2",
          active === "projects" && "border-b-2 border-orange-500"
        )}
        onClick={() => onChange("projects")}
      >
        Projects
      </button>
      |{" "}
      <button
        className={cn(
          "cursor-pointer p-2",
          active === "repositories" && "border-b-2 border-orange-500"
        )}
        onClick={() => onChange("repositories")}
      >
        Repositories
      </button>
    </div>
  );
};
