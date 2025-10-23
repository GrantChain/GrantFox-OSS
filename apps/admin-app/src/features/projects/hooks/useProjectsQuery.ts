import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";
import { Project, ProjectStatus } from "@/types/project.type";
import { ProjectService } from "../services/project.service";

export const useProjectsQuery = (status?: ProjectStatus) => {
  const projectService = new ProjectService(http);

  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects", { status: status ?? "ALL" }],
    queryFn: () => projectService.getProjects({ status }),
  });

  return { data, isLoading, error };
};
