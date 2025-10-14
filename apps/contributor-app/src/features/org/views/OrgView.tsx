"use client";

import Link from "next/link";

import {
  useOrganization,
  useOrgRepos,
} from "@/features/github/hooks/useGitHubOrgs";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { Repository } from "@/types/Github";
import { LoaderCard } from "@/components/ui/loader";
import { Back } from "@/components/shared/Back";

export function OrgView({ org }: { org: string }) {
  const {
    data: orgData,
    isLoading: orgLoading,
    isError: orgError,
  } = useOrganization(org);
  const { data: repos, isLoading: reposLoading } = useOrgRepos(org, {
    per_page: 20,
  });

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
        <p className="text-muted-foreground">Available Repositories</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {((reposLoading ? [] : repos) ?? []).map((r: Repository) => (
            <div
              key={r.id}
              className="relative rounded-xl border p-4 hover:bg-accent/40 transition-colors"
            >
              <ShineBorder
                className="pointer-events-none"
                shineColor={["#7c3aed33", "#22d3ee33"]}
              />
              <div className="flex justify-between items-center gap-3 min-w-0">
                <div className="flex items-center gap-3">
                  <img
                    src={r.owner?.avatar_url}
                    alt={r.full_name}
                    className="size-8 rounded-full"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/org/${r.owner?.login}/repo/${r.name}`}
                      className="font-medium hover:underline truncate block"
                    >
                      {r.full_name}
                    </Link>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {r.description === null || r.description === ""
                        ? "No description provided."
                        : r.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
