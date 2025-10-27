"use client";

import { LoaderCard } from "@/components/ui/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Ban,
  Github,
  MessageSquare,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react";
import type { IssueLabel } from "@/types/Github";
import { Button } from "@/components/ui/button";
import {
  useGitHubIssueTimeline,
  useGitHubRepoIssue,
} from "@/features/github/hooks/useGitHubRepos";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownRehypePlugins } from "@/lib/markdown";
import { GithubUserCard } from "@/components/shared/GithubUserCard";
import { Badge } from "@/components/ui/badge";

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

  const { data: timeline } = useGitHubIssueTimeline(org, repo, number, {
    per_page: 50,
  });

  if (issueLoading) {
    return (
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
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

  const linkedPR = Array.isArray(timeline)
    ? (() => {
        type CrossRefEvent = {
          event?: string;
          source?: {
            issue?: {
              number?: number;
              title?: string;
              html_url?: string;
              pull_request?: unknown;
            };
          };
        };
        const linked = (timeline as CrossRefEvent[]).find((e) =>
          Boolean(
            e?.event === "cross-referenced" && e?.source?.issue?.pull_request
          )
        );
        return linked?.source?.issue;
      })()
    : null;

  return (
    <section className="relative z-10 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-bold break-words leading-tight text-balance">
              #{issue.number}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mt-2 break-words text-balance">
              {issue.title}
            </p>
          </div>
          <Badge variant="outline">{issue.state.toUpperCase()}</Badge>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <GithubUserCard user={issue.user} />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-60" />
            <span>
              opened {new Date(issue.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 opacity-60" />
            <span>
              {issue.comments} {issue.comments === 1 ? "comment" : "comments"}
            </span>
          </div>

          {linkedPR && (
            <Link
              href={linkedPR.html_url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-foreground border border-border hover:bg-muted/80 transition-colors text-sm font-semibold"
            >
              <Github className="w-4 h-4" />
              PR #{linkedPR.number}
            </Link>
          )}

          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto gap-2 font-semibold"
          >
            <Link href={issue.html_url} target="_blank" rel="noreferrer">
              <Github className="w-5 h-5" />
              View on GitHub
            </Link>
          </Button>
        </div>
      </div>

      {Array.isArray(issue.assignees) && issue.assignees.length === 0 && (
        <div className="rounded-lg border border-border bg-muted/50 p-4 flex gap-4">
          <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground mb-1">
              How to apply to this issue
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To apply for this issue, <strong>comment on GitHub</strong>{" "}
              expressing your interest and relevant experience. The maintainers
              will review your application and assign the issue if approved.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">
            Assigned to
          </span>
        </div>
        {Array.isArray(issue.assignees) && issue.assignees.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {issue.assignees.map((assignee) => (
              <GithubUserCard key={assignee.id} user={assignee} />
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">
            Unassigned
          </span>
        )}
      </div>

      {/* Labels section */}
      {Array.isArray(issue.labels) && issue.labels.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Labels
          </h3>
          <div className="flex flex-wrap gap-2">
            {issue.labels.map((l: IssueLabel, idx: number) => {
              const name: string = l.name;
              const color = typeof l === "string" ? undefined : l?.color;
              return (
                <span
                  key={idx}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:shadow-md hover:scale-105"
                  style={
                    color
                      ? {
                          backgroundColor: `#${color}20`,
                          borderColor: `#${color}50`,
                          color: `#${color}`,
                        }
                      : undefined
                  }
                >
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}

      <hr className="border-border/40" />

      {/* Issue body */}
      <Card className="p-6 md:p-8 border border-border bg-muted/20">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Description</h2>
          <div className="prose prose-invert max-w-none text-foreground whitespace-pre-wrap break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={markdownRehypePlugins}
            >
              {issue.body ?? "No description provided"}
            </ReactMarkdown>
          </div>
        </div>
      </Card>
    </section>
  );
}
