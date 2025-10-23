"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { GitHubSearchService } from "../services/GitHubSearchService";

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
