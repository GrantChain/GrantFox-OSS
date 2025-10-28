import { useQuery } from "@tanstack/react-query";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";
import type { Repository as DbRepository } from "@/types/repositories.type";

const repoService = new RepositoriesService(http);

export function useProjectRepositories(projectId?: string) {
  return useQuery<DbRepository[]>({
    queryKey: ["project-repos", projectId],
    enabled: Boolean(projectId),
    queryFn: async () =>
      repoService.getRepositoriesByProject(projectId as string),
    staleTime: 1000 * 60 * 5,
  });
}
