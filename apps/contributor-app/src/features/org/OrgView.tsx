"use client";
import { useOrganization } from "@/features/github/hooks/useGitHubOrgs";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { LoaderCard } from "@/components/ui/loader";
import { useCampaignContext } from "@/context/CampaignContext";
import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "@/features/campaings/services/campaign.service";
import { http } from "@/lib/api";
import type { Repository as CampaignRepository } from "@/types/repositories.type";
import { OrgHeader } from "./OrgHeader";
import { OrgAside } from "./OrgAside";
import { RepositoryCard } from "../../components/shared/RepositoryCard";
import Link from "next/link";

export const OrgView = ({ org }: { org: string }) => {
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
      <main className="relative mx-auto w-full max-w-7xl px-4 py-10">
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
    <section className="relative z-10">
      {campaignLoading ? (
        <div className="mt-8 flex justify-center">
          <LoaderCard
            title="Loading campaign…"
            subtitle="Fetching campaign repositories for this organization."
          />
        </div>
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
        <>
          <OrgHeader project={project} org={org} />

          {/* Main content with sidebar */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Repositories Grid */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Campaign Repositories</h2>
                <p className="text-sm text-muted-foreground">
                  {repos.length} repositor{repos.length !== 1 ? "ies" : "y"} in
                  the{" "}
                  <Link href="/campaigns" className="font-bold hover:underline">
                    {activeCampaign?.name}
                  </Link>{" "}
                  campaign
                </p>
              </div>

              {repos.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Ban />
                    </EmptyMedia>
                    <EmptyTitle>No repositories found</EmptyTitle>
                    <EmptyDescription>
                      No repositories have been added to this campaign yet.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {repos.map((r) => (
                    <RepositoryCard key={r.github_repo_id} repo={r} org={org} />
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <OrgAside project={project} />
            </aside>
          </div>
        </>
      )}
    </section>
  );
};
