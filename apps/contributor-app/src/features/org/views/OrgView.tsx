"use client";

import Link from "next/link";

import { useOrganization } from "@/features/github/hooks/useGitHubOrgs";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { LoaderCard } from "@/components/ui/loader";
import { Back } from "@/components/shared/Back";
import { useCampaignContext } from "@/context/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "@/features/campaings/services/campaign.service";
import { http } from "@/lib/api";
import type { Repository as CampaignRepository } from "@/types/repositories.type";

export function OrgView({ org }: { org: string }) {
  const { activeCampaign } = useCampaignContext();
  const {
    data: orgData,
    isLoading: orgLoading,
    isError: orgError,
  } = useOrganization(org);
  const service = new CampaignService(http);
  const { data: campaignWithProjects, isLoading: campaignLoading } = useQuery({
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

  const project = (campaignWithProjects?.projects ?? []).find(
    (p) => p.github_handle.toLowerCase() === org.toLowerCase()
  );
  const repos: CampaignRepository[] = project?.repositories ?? [];

  if (orgLoading) {
    return (
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <section className="relative z-10 flex justify-center">
          <LoaderCard
            title="Loading organization…"
            subtitle="Fetching organization profile and repositories."
          />
        </section>
      </main>
    );
  }

  if (orgError || !orgData) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Ban />
          </EmptyMedia>
          <EmptyTitle>Organization not found</EmptyTitle>
          <EmptyDescription>
            Please check the URL or try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      <section className="relative z-10">
        <Back />
        <h1 className="text-3xl font-semibold">
          <span className="font-medium">Organization:</span> {orgData.login}
        </h1>
        <p className="text-muted-foreground">Campaign Repositories</p>

        {campaignLoading ? (
          <section className="relative z-10 mt-8 flex justify-center">
            <LoaderCard
              title="Loading campaign…"
              subtitle="Fetching campaign repositories for this organization."
            />
          </section>
        ) : !project ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Ban />
              </EmptyMedia>
              <EmptyTitle>No repositories in this campaign</EmptyTitle>
              <EmptyDescription>
                This organization has no repositories registered for the active
                campaign.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {repos.map((r) => (
              <div
                key={r.github_repo_id}
                className="relative rounded-xl border p-4 hover:bg-accent/40 transition-colors"
              >
                <ShineBorder
                  className="pointer-events-none"
                  shineColor={["#7c3aed33", "#22d3ee33"]}
                />
                <div className="flex justify-between items-center gap-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://github.com/${org}.png`}
                      alt={r.name}
                      className="size-8 rounded-full"
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/campaigns/org/${org}/repo/${r.name}`}
                        className="font-medium hover:underline truncate block"
                      >
                        {`${org}/${r.name}`}
                      </Link>

                      {r.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {r.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
