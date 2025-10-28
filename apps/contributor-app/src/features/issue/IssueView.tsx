"use client";

import { LoaderCard } from "@/components/ui/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban, AlertCircle } from "lucide-react";
import { useGitHubRepoIssue } from "@/features/github/hooks/useGitHubRepos";
import { IssueHeader } from "@/features/issue/components/IssueHeader";
import { IssueMetadata } from "@/features/issue/components/IssueMetadata";
import { IssueAssignees } from "@/features/issue/components/IssueAssignees";
import { IssueLabels } from "@/features/issue/components/IssueLabels";
import { IssueDescription } from "@/features/issue/components/IssueDescription";
import { useLinkedPullRequest } from "@/features/issue/hooks/useLinkedPullRequest";
import { Comments } from "./components/Comments";

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
  const { linkedPR, isMerged } = useLinkedPullRequest(org, repo, number);

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

  return (
    <section className="relative z-10 space-y-8">
      <IssueHeader
        issueNumber={issue.number}
        title={issue.title}
        state={issue.state}
      />
      <IssueMetadata
        user={issue.user}
        createdAt={issue.created_at}
        commentsCount={issue.comments}
        linkedPR={linkedPR}
        isMerged={isMerged}
        htmlUrl={issue.html_url}
      />
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
      <IssueAssignees assignees={issue.assignees} />

      <IssueLabels labels={issue.labels as unknown as []} />

      <hr className="border-border/40" />

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-3/5">
          <IssueDescription body={issue.body} />
        </div>
        <div className="w-full sm:w-2/5">
          <Comments org={org} repo={repo} issueNumber={issue.number} />
        </div>
      </div>
    </section>
  );
}
