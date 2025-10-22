"use client";

import { useQuery } from "@tanstack/react-query";
import { OrganizationsService } from "../services/organizations.service";
import { GithubOrganization } from "@/types/github.type";

type UseOrganizationQueryOptions = {
  orgHandle?: string | null;
  enabled?: boolean;
};

export function useOrganizationQuery(options: UseOrganizationQueryOptions) {
  const { orgHandle, enabled = true } = options;

  return useQuery<GithubOrganization, Error>({
    queryKey: ["githubOrganization", orgHandle],
    enabled: enabled && !!orgHandle,
    queryFn: async () => {
      const service = new OrganizationsService();
      return await service.getOrganization(orgHandle as string);
    },
    staleTime: 1000 * 60 * 5,
  });
}
