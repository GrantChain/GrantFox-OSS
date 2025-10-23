"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";
import { Highlighter } from "@/components/ui/highlighter";
import { RepoList } from "../components/RepoList";
import type { Project } from "@/types/project.type";
import type { Repository } from "@/types/repositories.type";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, MessageSquare } from "lucide-react";
import { useCampaignContext } from "@/context/CampaignContext";
import { CampaignService } from "@/features/campaings/services/campaign.service";
import { http } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function DiscoverView() {
  const { activeCampaign } = useCampaignContext();
  const service = new CampaignService(http);
  const { data: campaign } = useQuery({
    queryKey: [
      "campaign",
      "active",
      activeCampaign?.campaign_id,
      "with-projects-repos",
    ],
    queryFn: () =>
      service.getActiveCampaignWithProjectsAndRepos({
        campaign_id: activeCampaign?.campaign_id as string,
      }),
    enabled: Boolean(activeCampaign?.campaign_id),
    staleTime: 60_000,
  });
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full sm:w-11/12 mx-auto justify-between">
        <div className="flex justify-center flex-col px-10 py-4 gap-4">
          <HyperText>Discover Organizations</HyperText>

          <HyperText>and Repositories</HyperText>

          <p className="text-muted-foreground">
            Browse organizations, repositories, and issues.{" "}
            <Highlighter action="underline" color="#e45726">
              Find your next contribution fast.
            </Highlighter>{" "}
          </p>
        </div>

        <RepoList
          repositories={(campaign?.repositories ?? []) as Repository[]}
        />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-10 space-y-10">
        <section className="relative z-10">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Organizations
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(campaign?.projects as Project[] | undefined)?.map((proj) => (
              <div
                key={proj.project_id}
                className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10 hover:from-accent/10 hover:to-transparent transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden"
              >
                <ShineBorder
                  className="pointer-events-none"
                  shineColor={["#7c3aed33", "#22d3ee33"]}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/file.svg"}
                      alt={proj.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <Link
                      href={`/org/${proj.github_handle}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {proj.name}
                    </Link>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="transition-colors"
                  >
                    <Link href={`/org/${proj.github_handle}`}>View Org</Link>
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {proj.short_description || "No description provided."}
                </p>
              </div>
            ))}
            {/* Projects are from active campaign; no pagination for now */}
          </div>
        </section>

        <section className="relative z-10">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Repositories
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(campaign?.repositories ?? []).map((r: Repository) => (
              <div
                key={`${r.github_repo_id}`}
                className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10 hover:from-accent/10 hover:to-transparent transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden"
              >
                <ShineBorder
                  className="pointer-events-none"
                  shineColor={["#7c3aed33", "#22d3ee33"]}
                />
                <div className="flex justify-between items-center gap-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/file.svg"}
                      alt={r.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="min-w-0">
                      <Link
                        href={r.github_url}
                        className="font-medium hover:underline truncate block"
                      >
                        {r.name}
                      </Link>
                      {r.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {r.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
