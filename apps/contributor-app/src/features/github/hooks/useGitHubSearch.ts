"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { GitHubSearchService } from "../services/GitHubSearchService";
import { CURATED_ORG_LOGINS, CURATED_REPO_FULLNAMES } from "@/config/curation";

const searchService = new GitHubSearchService(githubHttp);

export function useSearchRepositoriesOnce(params: {
  q: string;
  sort?: "stars" | "forks" | "updated";
  order?: "desc" | "asc";
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: ["gh", "search-repos", params],
    queryFn: () => searchService.searchRepositories(params),
    enabled: Boolean(params.q),
    staleTime: 60_000,
  });
}

export function useSearchRepositoriesInfinite(base: {
  q: string;
  sort?: "stars" | "forks" | "updated";
  order?: "desc" | "asc";
  per_page?: number;
}) {
  return useInfiniteQuery({
    queryKey: ["gh", "search-repos-infinite", base],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchService.searchRepositories({ ...base, page: pageParam as number }),
    getNextPageParam: (lastPage: { items: unknown[] }, pages) =>
      Array.isArray(lastPage?.items) && lastPage.items.length > 0
        ? pages.length + 1
        : undefined,
  });
}

/**
 * Curated repositories based on allowlisted orgs or explicit repo fullnames.
 * Uses GitHub search syntax to limit results: user:ORG1 user:ORG2 repo:full/name
 */
export function useCuratedRepositoriesInfinite(base?: {
  sort?: "stars" | "forks" | "updated";
  order?: "desc" | "asc";
  per_page?: number;
}) {
  const hasRepoList = CURATED_REPO_FULLNAMES.length > 0;
  const orgFilters = CURATED_ORG_LOGINS.map((o) => `user:${o}`).join(" ");
  const repoFilters = CURATED_REPO_FULLNAMES.map((r) => `repo:${r}`).join(" ");
  const qParts = [hasRepoList ? repoFilters : orgFilters, "stars:>0"].filter(
    Boolean
  );

  const q = qParts.join(" ");

  return useInfiniteQuery({
    queryKey: [
      "gh",
      "search-repos-curated-infinite",
      { q, sort: base?.sort, order: base?.order, per_page: base?.per_page },
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchService.searchRepositories({
        q,
        sort: base?.sort ?? "stars",
        order: base?.order ?? "desc",
        per_page: base?.per_page ?? 12,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage: { items: unknown[] }, pages) =>
      Array.isArray(lastPage?.items) && lastPage.items.length > 0
        ? pages.length + 1
        : undefined,
    enabled: Boolean(q.length > 0),
    staleTime: 60_000,
  });
}

/**
 * One-shot curated repositories for landing/home.
 */
export function useCuratedRepositoriesOnce(base?: {
  sort?: "stars" | "forks" | "updated";
  order?: "desc" | "asc";
  per_page?: number;
  page?: number;
}) {
  const hasRepoList = CURATED_REPO_FULLNAMES.length > 0;
  const orgFilters = CURATED_ORG_LOGINS.map((o) => `user:${o}`).join(" ");
  const repoFilters = CURATED_REPO_FULLNAMES.map((r) => `repo:${r}`).join(" ");
  const qParts = [hasRepoList ? repoFilters : orgFilters, "stars:>0"].filter(
    Boolean
  );
  const q = qParts.join(" ");

  return useQuery({
    queryKey: [
      "gh",
      "search-repos-curated-once",
      {
        q,
        sort: base?.sort,
        order: base?.order,
        per_page: base?.per_page,
        page: base?.page,
      },
    ],
    queryFn: () =>
      searchService.searchRepositories({
        q,
        sort: base?.sort ?? "stars",
        order: base?.order ?? "desc",
        per_page: base?.per_page ?? 10,
        page: base?.page ?? 1,
      }),
    enabled: Boolean(q.length > 0),
    staleTime: 60_000,
  });
}

export function useSearchUsersOnce(params: {
  q: string;
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: ["gh", "search-users", params],
    queryFn: () => searchService.searchUsers(params),
    enabled: Boolean(params.q),
    staleTime: 60_000,
  });
}
