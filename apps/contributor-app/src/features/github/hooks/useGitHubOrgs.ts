"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GitHubOrgsService } from "../services/GitHubOrgsService";

const orgsService = new GitHubOrgsService();

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
