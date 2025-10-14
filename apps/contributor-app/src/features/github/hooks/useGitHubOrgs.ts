"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { GitHubOrgsService } from "../services/GitHubOrgsService";
import { CURATED_ORG_LOGINS } from "@/config/curation";

const orgsService = new GitHubOrgsService(githubHttp);

export function useOrganizations(params?: {
  per_page?: number;
  since?: number;
}) {
  return useQuery({
    queryKey: ["gh", "orgs", params],
    queryFn: () => orgsService.listOrganizations(params),
  });
}

export function useOrganization(org: string) {
  return useQuery({
    queryKey: ["gh", "org", org],
    queryFn: () => orgsService.getOrganization(org),
    enabled: Boolean(org),
  });
}

export function useUserOrganizations(
  username: string,
  params?: { per_page?: number; page?: number }
) {
  return useQuery({
    queryKey: ["gh", "user-orgs", username, params],
    queryFn: () => orgsService.listUserOrganizations(username, params),
    enabled: Boolean(username),
  });
}

export function useOrgRepos(
  org: string,
  params?: { per_page?: number; page?: number; sort?: string; type?: string }
) {
  return useQuery({
    queryKey: ["gh", "org-repos", org, params],
    queryFn: () => orgsService.listOrgRepos(org, params),
    enabled: Boolean(org),
  });
}

export function useOrganizationsInfinite(per_page: number = 12) {
  return useInfiniteQuery({
    queryKey: ["gh", "orgs-infinite", per_page],
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      orgsService.listOrganizations({ per_page, since: pageParam }),
    getNextPageParam: (lastPage: Array<{ id: number }>) => {
      if (!Array.isArray(lastPage) || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1]?.id;
    },
  });
}

/**
 * Fetch a curated list of organizations based on an allowlist of logins.
 * Uses parallel queries and returns the resolved org objects in input order.
 */
export function useCuratedOrganizations(orgs: string[] = CURATED_ORG_LOGINS) {
  return useQuery({
    queryKey: ["gh", "orgs-curated", orgs],
    queryFn: async () => {
      const results = await Promise.all(
        orgs.map(async (org) => {
          try {
            return await orgsService.getOrganization(org);
          } catch (_err) {
            return null;
          }
        })
      );
      return results.filter((o): o is NonNullable<typeof o> => Boolean(o));
    },
    enabled: Array.isArray(orgs) && orgs.length > 0,
    staleTime: 60_000,
  });
}

/**
 * Aggregate all repositories from curated orgs with pagination per org.
 * Note: GitHub API is per-org paged; this helper fetches first N per org.
 */
export function useCuratedOrgReposOnce(params?: { per_org?: number }) {
  const perOrg = params?.per_org ?? 100;
  return useQuery({
    queryKey: ["gh", "orgs-curated-repos-once", { perOrg }],
    queryFn: async () => {
      const pages = await Promise.all(
        CURATED_ORG_LOGINS.map((org) =>
          orgsService.listOrgRepos(org, { per_page: perOrg })
        )
      );
      return pages.flat();
    },
    staleTime: 60_000,
  });
}

/**
 * Infinite aggregator to fetch all repos across curated orgs, page by page per org.
 */
export function useCuratedOrgReposInfinite(perOrgPerPage: number = 30) {
  return useInfiniteQuery({
    queryKey: ["gh", "orgs-curated-repos-infinite", perOrgPerPage],
    initialPageParam: 1 as number,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const results = await Promise.all(
        CURATED_ORG_LOGINS.map((org) =>
          orgsService.listOrgRepos(org, { per_page: perOrgPerPage, page })
        )
      );
      const items = results.flat();
      const done = results.every(
        (arr) => Array.isArray(arr) && arr.length < perOrgPerPage
      );
      return { items, page, done } as {
        items: unknown[];
        page: number;
        done: boolean;
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.done ? undefined : lastPage.page + 1,
    staleTime: 60_000,
  });
}
