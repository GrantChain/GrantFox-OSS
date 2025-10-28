import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";
import type { GitHubRepository } from "@/types/github.type";
import type { RepositoryPayload } from "@/types/repositories.type";

const repoService = new RepositoriesService(http);

export function useRegisterRepositoryToProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (repo: GitHubRepository) => {
      const payload: RepositoryPayload = {
        github_repo_id: repo.id,
        github_url: repo.html_url,
        name: repo.name,
        description: repo.description ?? "",
      };
      return await repoService.addRepositoryToProject(projectId, payload);
    },
    onSuccess: async () => {
      toast.success("Repository registered to project");
      await queryClient.invalidateQueries({
        queryKey: ["project-repos", projectId],
      });
    },
    onError: () => {
      toast.error("Failed to register repository to project");
    },
  });
}
