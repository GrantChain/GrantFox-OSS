"use client";

import { useMemo } from "react";
import {
  useGitHubIssueTimeline,
  useGitHubPullRequest,
} from "@/features/github/hooks/useGitHubRepos";

export type LinkedPullRequestSummary = {
  number: number;
  title?: string;
  html_url?: string;
} | null;

/**
 * Derives the PR cross-referenced from an issue's timeline and fetches its merge status.
 */
export function useLinkedPullRequest(
  org: string,
  repo: string,
  issueNumber: number
) {
  const { data: timeline, isLoading: isTimelineLoading } = useGitHubIssueTimeline(
    org,
    repo,
    issueNumber,
    { per_page: 50 }
  );

  const linkedPR: LinkedPullRequestSummary = useMemo(() => {
    if (!Array.isArray(timeline)) return null;
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
    const match = (timeline as CrossRefEvent[]).find(
      (e) => e?.event === "cross-referenced" && Boolean(e?.source?.issue?.pull_request)
    );
    const issue = match?.source?.issue;
    return issue?.number
      ? { number: issue.number, title: issue.title, html_url: issue.html_url }
      : null;
  }, [timeline]);

  const prNumber = linkedPR?.number ?? 0;
  const { data: linkedPRDetails, isLoading: isPullRequestLoading } = useGitHubPullRequest(
    org,
    repo,
    prNumber
  );

  const isMerged = Boolean(linkedPRDetails?.merged_at);

  return {
    linkedPR,
    isMerged,
    isLoading: isTimelineLoading || (linkedPR ? isPullRequestLoading : false),
  } as const;
}


