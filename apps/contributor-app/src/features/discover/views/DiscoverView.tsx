"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";
import { Highlighter } from "@/components/ui/highlighter";
import { RepoList } from "../components/RepoList";
import { Organization, Repository } from "@/types/Github";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, MessageSquare } from "lucide-react";
import {
  useCuratedOrganizations,
  useCuratedOrgReposInfinite,
} from "@/features/github/hooks/useGitHubOrgs";

export function DiscoverView() {
  const { data: curatedOrgs } = useCuratedOrganizations();
  const reposInfinite = useCuratedOrgReposInfinite(30);
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

        <RepoList />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-10 space-y-10">
        <section className="relative z-10">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Organizations
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(curatedOrgs as Organization[] | undefined)?.map((org) => (
              <div
                key={org.id}
                className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10 hover:from-accent/10 hover:to-transparent transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden"
              >
                <ShineBorder
                  className="pointer-events-none"
                  shineColor={["#7c3aed33", "#22d3ee33"]}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={org.avatar_url}
                      alt={org.login}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <Link
                      href={`/org/${org.login}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {org.login}
                    </Link>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="transition-colors"
                  >
                    <Link href={`/org/${org.login}`}>View Org</Link>
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {org.description || "No description provided."}
                </p>
              </div>
            ))}
            {/* No pagination for curated orgs */}
          </div>
        </section>

        <section className="relative z-10">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Repositories
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              (reposInfinite.data?.pages as
                | Array<{ items: Repository[] }>
                | undefined) ?? []
            )
              .flatMap((p) => p.items)
              .map((r: Repository) => (
                <div
                  key={r.id}
                  className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10 hover:from-accent/10 hover:to-transparent transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden"
                >
                  <ShineBorder
                    className="pointer-events-none"
                    shineColor={["#7c3aed33", "#22d3ee33"]}
                  />
                  <div className="flex justify-between items-center gap-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <Image
                        src={r.owner?.avatar_url}
                        alt={r.full_name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/org/${r.owner?.login}/repo/${r.name}`}
                          className="font-medium hover:underline truncate block"
                        >
                          {r.full_name}
                        </Link>
                        {r.description && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {r.description}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {r.language && (
                            <Badge
                              variant="secondary"
                              className="px-2 py-0.5 text-[10px]"
                            >
                              {r.language}
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className="gap-1 px-2 py-0.5 text-[10px]"
                          >
                            <Star className="h-3 w-3" /> {r.stargazers_count}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="gap-1 px-2 py-0.5 text-[10px]"
                          >
                            <GitFork className="h-3 w-3" /> {r.forks_count}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="gap-1 px-2 py-0.5 text-[10px]"
                          >
                            <MessageSquare className="h-3 w-3" />{" "}
                            {r.open_issues_count}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {reposInfinite.hasNextPage && (
              <div className="flex col-span-full justify-center">
                <Button
                  onClick={() => reposInfinite.fetchNextPage()}
                  disabled={reposInfinite.isFetchingNextPage}
                  className="cursor-pointer"
                >
                  {reposInfinite.isFetchingNextPage
                    ? "Loading..."
                    : "Load More"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
