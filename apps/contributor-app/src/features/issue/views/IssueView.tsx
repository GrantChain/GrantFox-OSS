"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { Back } from "@/components/shared/Back";
import { LoaderCard } from "@/components/ui/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { IssueLabel } from "@/types/Github";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGitHubRepoIssue } from "@/features/github/hooks/useGitHubRepos";

export function IssueView({
  org,
  repo,
  number,
}: {
  org: string;
  repo: string;
  number: number;
}) {
  const {
    data: issue,
    isLoading: issueLoading,
    isError: issueError,
  } = useGitHubRepoIssue(org, repo, number);

  if (issueLoading) {
    return (
      <main className="relative mx-auto w-full max-w-3xl px-4 py-10">
        <DotPattern className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
        <section className="relative z-10 flex justify-center">
          <LoaderCard
            title="Loading issue…"
            subtitle="Fetching issue details and comments."
          />
        </section>
      </main>
    );
  }
  if (issueError || !issue) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Ban />
          </EmptyMedia>
          <EmptyTitle>Issue not found</EmptyTitle>
          <EmptyDescription>
            Please check the URL or try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      <DotPattern className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
      <section className="relative z-10 space-y-6">
        <Back />
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold break-words leading-snug">
              #{issue.number} {issue.title}
            </h1>
            <span
              className={
                issue.state === "open"
                  ? "rounded-full border px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "rounded-full border px-2 py-0.5 text-xs bg-rose-500/10 text-rose-400 border-rose-500/20"
              }
            >
              {issue.state.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {issue.user?.avatar_url ? (
            <Image
              src={issue.user.avatar_url}
              alt={issue.user.login}
              width={24}
              height={24}
              className="rounded"
            />
          ) : null}
          <a
            href={issue.user?.html_url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {issue.user?.login}
          </a>
          <span>
            opened on {new Date(issue.created_at).toLocaleDateString()}
          </span>
          <span>• {issue.comments} comments</span>
        </div>
        {Array.isArray(issue.labels) && issue.labels.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {issue.labels.map((l: IssueLabel, idx: number) => {
              const name: string = l.name;
              const color = typeof l === "string" ? undefined : l?.color;
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

        <Button asChild size="sm" className="w-1/5">
          <a href={issue.html_url} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </Button>
        <hr className="border-border/60" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* <Card className="prose prose-invert col-span-2 max-w-[75ch]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue.body ?? ""}
            </ReactMarkdown>
          </Card> */}
          {/* <aside className="col-span-1 space-y-3 text-sm md:sticky md:top-24 self-start">
            <div className="rounded-lg border p-3 bg-card/30">
              <div className="mb-2 font-medium">Details</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <span className="text-muted-foreground">Created</span>
                <span className="justify-self-end">
                  {new Date(issue.created_at).toLocaleDateString()}
                </span>
                {issue.updated_at ? (
                  <>
                    <span className="text-muted-foreground">Updated</span>
                    <span className="justify-self-end">
                      {new Date(issue.updated_at).toLocaleDateString()}
                    </span>
                  </>
                ) : null}
                {issue.closed_at ? (
                  <>
                    <span className="text-muted-foreground">Closed</span>
                    <span className="justify-self-end">
                      {new Date(issue.closed_at).toLocaleDateString()}
                    </span>
                  </>
                ) : null}
                {issue.milestone ? (
                  <>
                    <span className="text-muted-foreground">Milestone</span>
                    <span className="justify-self-end">
                      {String(issue.milestone)}
                    </span>
                  </>
                ) : null}
                {Array.isArray(issue.assignees) &&
                issue.assignees.length > 0 ? (
                  <>
                    <span className="text-muted-foreground">Assignees</span>
                    <span className="justify-self-end">
                      {issue.assignees.length}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="rounded-lg border p-3 bg-card/30">
              <Button asChild size="sm" className="w-full">
                <a href={issue.html_url} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </aside> */}
        </div>
      </section>
    </main>
  );
}
