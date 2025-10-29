"use client";

import { useQuery } from "@tanstack/react-query";
import { GithubRepositoriesService } from "../services/repositories.service";

const reposService = new GithubRepositoriesService();

export function useGitHubRepo(owner: string, repo: string) {
  return useQuery({
    queryKey: ["gh", "repo", owner, repo],
    queryFn: () => reposService.getRepo(owner, repo),
    enabled: Boolean(owner && repo),
  });
}

export function useGitHubRepoIssues(
  owner: string,
  repo: string,
  params?: {
    per_page?: number;
    page?: number;
    state?: "open" | "closed" | "all";
    labels?: string;
  }
) {
  return useQuery({
    queryKey: ["gh", "repo-issues", owner, repo, params],
    queryFn: () => reposService.listIssues(owner, repo, params),
    enabled: Boolean(owner && repo),
  });
}

export function useGitHubRepoIssue(
  owner: string,
  repo: string,
  issue_number: number
) {
  return useQuery({
    queryKey: ["gh", "repo-issue", owner, repo, issue_number],
    queryFn: () => reposService.getIssue(owner, repo, issue_number),
    enabled: Boolean(owner && repo && issue_number),
  });
}

export function useGitHubIssueComments(
  owner: string,
  repo: string,
  issue_number: number,
  params?: { per_page?: number; page?: number }
) {
  return useQuery({
    queryKey: ["gh", "issue-comments", owner, repo, issue_number, params],
    queryFn: () =>
      reposService.listIssueComments(owner, repo, issue_number, params),
    enabled: Boolean(owner && repo && issue_number),
  });
}

export function useGitHubAllIssueComments(
  owner: string,
  repo: string,
  params?: { per_page?: number; page?: number; since?: string }
) {
  return useQuery({
    queryKey: ["gh", "repo-issues-comments", owner, repo, params],
    queryFn: () => reposService.listAllIssueComments(owner, repo, params),
    enabled: Boolean(owner && repo),
  });
}

export function useGitHubIssueTimeline(
  owner: string,
  repo: string,
  issue_number: number,
  params?: { per_page?: number; page?: number }
) {
  return useQuery({
    queryKey: ["gh", "issue-timeline", owner, repo, issue_number, params],
    queryFn: () =>
      reposService.getIssueTimeline(owner, repo, issue_number, params),
    enabled: Boolean(owner && repo && issue_number),
    staleTime: 60_000,
  });
}

export function useGitHubContributors(owner: string, repo: string) {
  return useQuery({
    queryKey: ["gh", "repo-contributors", owner, repo],
    queryFn: () => reposService.listContributors(owner, repo),
    enabled: Boolean(owner && repo),
    staleTime: 60_000,
  });
}

export function useGitHubLanguages(owner: string, repo: string) {
  return useQuery({
    queryKey: ["gh", "repo-languages", owner, repo],
    queryFn: () => reposService.getLanguages(owner, repo),
    enabled: Boolean(owner && repo),
    staleTime: 60_000,
  });
}

export function useGitHubPullRequest(
  owner: string,
  repo: string,
  pull_number: number
) {
  return useQuery({
    queryKey: ["gh", "pull", owner, repo, pull_number],
    queryFn: () => reposService.getPullRequest(owner, repo, pull_number),
    enabled: Boolean(owner && repo && pull_number),
    staleTime: 60_000,
  });
}
