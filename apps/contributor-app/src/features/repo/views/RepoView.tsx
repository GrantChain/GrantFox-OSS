"use client";

import Link from "next/link";

import { DotPattern } from "@/components/ui/dot-pattern";
import { Button } from "@/components/ui/button";
import { LoaderCard } from "@/components/ui/loader";
import {
  useGitHubRepo,
  useGitHubRepoIssues,
} from "@/features/github/hooks/useGitHubRepos";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { Back } from "@/components/shared/Back";
import { Issue, IssueLabel } from "@/types/Github";
import { useCampaignContext } from "@/context/CampaignContext";
import { Card } from "@/components/ui/card";

export function RepoView({ org, repo }: { org: string; repo: string }) {
  const { activeCampaign } = useCampaignContext();
  const campaignLabel = activeCampaign?.name || undefined;
  const {
    data,
    isLoading: repoLoading,
    isError: repoError,
  } = useGitHubRepo(org, repo);
  const { data: issues, isLoading: issuesLoading } = useGitHubRepoIssues(
    org,
    repo,
    {
      per_page: 30,
      state: "open",
      labels: campaignLabel,
    }
  );
  if (repoLoading) {
    return (
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <section className="relative z-10 flex justify-center">
          <LoaderCard
            title="Loading repository…"
            subtitle="Fetching repository details and open issues."
          />
        </section>
      </main>
    );
  }
  if (repoError || !data) {
    return (
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <section className="relative z-10">
          <h1 className="text-3xl font-semibold">Repository not found</h1>
          <p className="text-muted-foreground">
            Please check the URL or try again.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      <DotPattern className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />
      <section className="relative z-10">
        <Back />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <p className="text-muted-foreground">{data.description}</p>
            <div className="mt-2 text-sm text-muted-foreground">
              ★ {data.stargazers_count} • Forks {data.forks_count} •{" "}
              {data.language}
            </div>
          </div>
          <Button asChild>
            <Link
              href={
                data.html_url ??
                `https://github.com/${data.owner?.login ?? org}/${data.name}`
              }
              target="_blank"
              rel="noreferrer"
            >
              Open on GitHub
            </Link>
          </Button>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Campaign Issues</h2>
        <div className="mt-4 grid grid-cols-1 gap-3">
          {campaignLabel &&
            issues &&
            (issues ?? []).filter((i: Issue) =>
              (i.labels ?? []).some((l) => l.name === campaignLabel)
            ).length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Ban />
                  </EmptyMedia>
                  <EmptyTitle>No campaign issues</EmptyTitle>
                  <EmptyDescription>
                    {`No issues found with label ${campaignLabel}.`}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}

          {(campaignLabel
            ? ((issuesLoading ? [] : issues) ?? []).filter((issue: Issue) =>
                (issue.labels ?? []).some((l) => l.name === campaignLabel)
              )
            : []
          ).map((issue: Issue) => (
            <Link
              key={issue.id}
              href={`/org/${org}/repo/${repo}/issue/${issue.number}`}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    #{issue.number} {issue.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    • {issue.comments} comments
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Opened by {issue.user?.login} on{" "}
                  {new Date(issue.created_at).toLocaleDateString()}
                </div>

                {Array.isArray(issue.labels) && issue.labels.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1 mt-2">
                    {issue.labels.map((l: IssueLabel, idx: number) => {
                      const name: string = l.name;
                      const color =
                        typeof l === "string" ? undefined : l?.color;
                      return (
                        <span
                          key={idx}
                          className="rounded-full border px-2 py-0.5 text-xs"
                          style={
                            color
                              ? {
                                  backgroundColor: `#${color}20`,
                                  borderColor: `#${color}40`,
                                }
                              : undefined
                          }
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </Card>
            </Link>
          ))}
          {!campaignLabel && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Ban />
                </EmptyMedia>
                <EmptyTitle>No active campaign</EmptyTitle>
                <EmptyDescription>
                  Select an active campaign to view labeled issues.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </section>
    </main>
  );
}
