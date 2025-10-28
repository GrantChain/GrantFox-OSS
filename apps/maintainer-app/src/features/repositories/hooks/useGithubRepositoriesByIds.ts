import { useQuery } from "@tanstack/react-query";
import { GithubRepositoriesService } from "@/features/github/services/repositories.service";
import type { GitHubRepository } from "@/types/github.type";

const ghRepoService = new GithubRepositoriesService();

export function useGithubRepositoriesByIds(projectId?: string, ids?: number[]) {
  const enabled = Boolean(projectId) && Array.isArray(ids) && ids.length > 0;
  return useQuery<GitHubRepository[]>({
    queryKey: ["project-repos:github-details", projectId, ids ?? []],
    enabled,
    queryFn: async () => {
      const safeIds = ids ?? [];
      const results = await Promise.all(
        safeIds.map((id) => ghRepoService.getRepositoryById(id))
      );
      return results;
    },
    staleTime: 1000 * 60 * 5,
  });
}
