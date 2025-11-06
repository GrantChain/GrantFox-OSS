"use client";

import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project.type";
import { ShineBorder } from "@/components/ui/shine-border";
import { ExternalLink } from "lucide-react";

interface CampaignProjectsListProps {
  projects: Project[];
}

export const CampaignProjectsList = ({
  projects,
}: CampaignProjectsListProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        projects.map((proj) => (
          <Link
            href={`https://contribute.grantfox.xyz/campaigns/org/${proj.github_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium"
            key={proj.project_id}
          >
            <div className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10 hover:from-accent/10 hover:to-transparent transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden min-h-30">
              <ShineBorder
                className="pointer-events-none"
                shineColor={["#7c3aed33", "#22d3ee33"]}
              />
              <div className="flex items-center justify-between">
                <div className="flex justify-between w-full items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://github.com/${proj.github_handle}.png`}
                      alt={proj.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />

                    {proj.name}
                  </div>

                  <ExternalLink className="hidden group-hover:block size-4 text-muted-foreground" />
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {proj.short_description || "No description provided."}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-muted-foreground">No projects found</p>
      )}
    </div>
  );
};
