import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RepositoriesService } from "@/features/repositories/services/repositories.service";
import { http } from "@/lib/api";

const repoService = new RepositoriesService(http);

export function useRemoveRepositoryFromProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (githubRepoId: number) => {
      return await repoService.removeRepositoryFromProject(
        String(githubRepoId)
      );
    },
    onSuccess: async () => {
      toast.success("Repository removed from project");
      await queryClient.invalidateQueries({
        queryKey: ["project-repos", projectId],
      });
    },
    onError: () => {
      toast.error("Failed to remove repository from project");
    },
  });
}
