"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { http } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { useCampaignContext } from "@/context/CampaignContext";
import { GitHubApplicationsService } from "../github/services/GitHubApplicationsService";
import { GitHubReposService } from "../github/services/GitHubReposService";
import type { Issue, SearchIssuesResponse } from "@/types/Github";
import {
  ApplicationsTable,
  type ApplicationRow,
  type ApplicationStatus,
} from "./ApplicationsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const githubApplicationsService = new GitHubApplicationsService(githubHttp);
const reposService = new GitHubReposService(githubHttp);

type TimelineEvent =
  | {
      event: "connected" | "cross-referenced";
      source?: {
        issue?: {
          state?: "open" | "closed";
          pull_request?: Record<string, unknown>;
          number?: number;
        };
      };
    }
  | { event: "closed" | "assigned" | "unassigned"; [key: string]: unknown }
  | { event: string; [key: string]: unknown };

function parseOwnerRepo(
  repositoryUrl: string
): { owner: string; repo: string } | null {
  try {
    const parts = new URL(repositoryUrl);
    const segs = parts.pathname.split("/").filter(Boolean);
    // Expected GitHub API path: /repos/{owner}/{repo}
    if (segs[0] === "repos" && segs.length >= 3) {
      return { owner: segs[1]!, repo: segs[2]! };
    }
    if (segs.length >= 2) return { owner: segs[0]!, repo: segs[1]! };
    return null;
  } catch {
    return null;
  }
}

function computeStatus(
  issue: Issue,
  timeline: TimelineEvent[],
  username: string
): ApplicationStatus {
  if (issue.state === "closed") return "COMPLETED";
  const assigneeLogin = issue.assignee?.login ?? null;
  if (assigneeLogin && assigneeLogin !== username) return "ASSIGNED_TO_OTHER";

  const hasLinkedPrOpen = timeline.some((t) => {
    if (t.event !== "connected" && t.event !== "cross-referenced") return false;
    const pr = (
      t as Extract<TimelineEvent, { event: "connected" | "cross-referenced" }>
    ).source?.issue?.pull_request;
    const prState = (
      t as Extract<TimelineEvent, { event: "connected" | "cross-referenced" }>
    ).source?.issue?.state;
    return Boolean(pr) && prState === "open";
  });

  if (hasLinkedPrOpen) return "IN_REVIEW";
  if (assigneeLogin === username) return "PR_EXPECTED";
  return "AWAITING_ASSIGNMENT";
}

function extractLinkedPrNumber(timeline: TimelineEvent[]): number | null {
  type ConnectedEvent = Extract<
    TimelineEvent,
    { event: "connected" | "cross-referenced" }
  >;
  const isConnectedEvent = (e: TimelineEvent): e is ConnectedEvent => {
    return e.event === "connected" || e.event === "cross-referenced";
  };
  for (const t of timeline) {
    if (isConnectedEvent(t)) {
      const pr = t.source?.issue?.pull_request;
      const prNum = t.source?.issue?.number;
      if (pr && typeof prNum === "number") return prNum;
    }
  }
  return null;
}

export const MyApplicationsView = () => {
  const { user } = useUser();
  const username = user?.user_metadata?.user_name ?? "";
  const { activeCampaign } = useCampaignContext();

  const [selectedLabel, setSelectedLabel] = useState<string>(
    activeCampaign?.name ?? ""
  );

  useEffect(() => {
    if (activeCampaign?.name) setSelectedLabel(activeCampaign.name);
  }, [activeCampaign?.name]);

  // Use campaigns from context to avoid duplicate network requests
  const { campaigns } = useCampaignContext();

  const { data: issuesSearch } = useQuery<SearchIssuesResponse>({
    queryKey: ["applications", username, selectedLabel],
    enabled: Boolean(username && selectedLabel),
    queryFn: async () => {
      const [open, closed] = await Promise.all([
        githubApplicationsService.getIssuesApplication({
          label: selectedLabel,
          username,
          state: "open",
        }),
        githubApplicationsService.getIssuesApplication({
          label: selectedLabel,
          username,
          state: "closed",
        }),
      ]);
      return {
        total_count: open.total_count + closed.total_count,
        incomplete_results:
          open.incomplete_results || closed.incomplete_results,
        items: [...open.items, ...closed.items],
      };
    },
  });

  const { data: rows = [], isLoading } = useQuery<ApplicationRow[]>({
    queryKey: [
      "applications",
      "rows",
      username,
      selectedLabel,
      issuesSearch?.items.length ?? 0,
    ],
    enabled: Boolean(username && selectedLabel && issuesSearch?.items?.length),
    queryFn: async () => {
      const issues = issuesSearch?.items ?? [];
      const enriched = await Promise.all(
        issues.map(async (issue) => {
          const parsed = parseOwnerRepo(issue.repository_url);
          let timeline: TimelineEvent[] = [];
          if (parsed) {
            try {
              timeline = (await reposService.getIssueTimeline(
                parsed.owner,
                parsed.repo,
                issue.number
              )) as TimelineEvent[];
            } catch {
              timeline = [];
            }
          }
          const status = computeStatus(issue, timeline, username);
          const repo = parsed ? `${parsed.owner}/${parsed.repo}` : "";
          const labels = (issue.labels ?? []).map((l) => l.name);
          const prNumber = extractLinkedPrNumber(timeline);
          const row: ApplicationRow = {
            id: issue.id,
            number: issue.number,
            title: issue.title,
            repo,
            html_url: issue.html_url,
            comments: issue.comments,
            created_at: issue.created_at,
            assignee: issue.assignee?.login ?? null,
            state: issue.state,
            status,
            labels,
            prNumber,
          };
          return row;
        })
      );
      return enriched;
    },
  });

  const labelOptions = useMemo(
    () => (campaigns ?? []).map((c) => c.name),
    [campaigns]
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Select
          value={selectedLabel}
          onValueChange={(v) => setSelectedLabel(v)}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select campaign label" />
          </SelectTrigger>
          <SelectContent>
            {labelOptions.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Card className="p-4 text-sm text-muted-foreground">
          Loading applications…
        </Card>
      ) : (
        <ApplicationsTable rows={rows} />
      )}
    </div>
  );
};
