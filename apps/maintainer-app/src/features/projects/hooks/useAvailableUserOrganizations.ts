"use client";

import { useQuery } from "@tanstack/react-query";
import { OrganizationsService } from "@/features/github/services/organizations.service";
import { ProjectsService } from "../services/projects.service";
import { http } from "@/lib/api";
import type { UserOrganization } from "@/types/github.type";

/**
 * Returns the authenticated user's GitHub organizations filtered to only those
 * that do not already exist as projects in GrantFox (using validateGitHubHandle).
 *
 * Single query, no extra refetching or cascading rerenders.
 */
export function useAvailableUserOrganizations(options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? true;
  return useQuery<UserOrganization[], Error>({
    queryKey: ["github", "user-orgs", "available"],
    queryFn: async () => {
      const orgService = new OrganizationsService();
      const projectService = new ProjectsService(http);

      const orgs = await orgService.getOrganizationsByAuthenticatedUser();

      // Validate handles in parallel, then filter out existing ones
      const validations = await Promise.all(
        orgs.map(async (org) => {
          const result = await projectService.validateGitHubHandle(org.login);
          return { org, exists: result.exists };
        })
      );

      return validations.filter((v) => !v.exists).map((v) => v.org);
    },
    staleTime: 1000 * 60 * 5,
    enabled,
    refetchOnWindowFocus: false,
  });
}
