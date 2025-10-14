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
import { Issue } from "@/types/Github";

export function RepoView({ org, repo }: { org: string; repo: string }) {
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
            <a
              href={
                data.html_url ??
                `https://github.com/${data.owner?.login ?? org}/${data.name}`
              }
              target="_blank"
              rel="noreferrer"
            >
              Open on GitHub
            </a>
          </Button>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Open Issues</h2>
        <div className="mt-4 grid grid-cols-1 gap-3">
          {issues && issues.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Ban />
                </EmptyMedia>
                <EmptyTitle>No open issues</EmptyTitle>
                <EmptyDescription>No open issues found.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {((issuesLoading ? [] : issues) ?? []).map((issue: Issue) => (
            <Link
              key={issue.id}
              href={`/org/${org}/repo/${repo}/issue/${issue.number}`}
              className="rounded-lg border p-4 hover:bg-accent"
            >
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
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
