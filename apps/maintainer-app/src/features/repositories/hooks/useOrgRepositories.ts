import { useQuery } from "@tanstack/react-query";
import { OrganizationsService } from "@/features/github/services/organizations.service";
import type { GitHubRepository } from "@/types/github.type";

const orgService = new OrganizationsService();

export function useOrgRepositories(orgLogin?: string) {
  return useQuery<GitHubRepository[]>({
    queryKey: ["org-repos", orgLogin],
    enabled: Boolean(orgLogin),
    queryFn: async () => {
      if (!orgLogin) return [];
      return await orgService.listOrgRepos(orgLogin, {
        per_page: 100,
        type: "public",
      });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
