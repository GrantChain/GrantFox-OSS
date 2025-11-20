import { useQuery } from "@tanstack/react-query";
import { ProjectsService } from "../services/projects.service";
import { http } from "@/lib/api";
import { useOrganizationQuery } from "@/features/github/hooks/useOrganizationQuery";
import type { Project } from "@/types/project.type";
import { GithubOrganization } from "@/types/github.type";

type UseProjectWithOrgResult = {
  project: Project | undefined;
  organizationData: GithubOrganization | undefined;
  isLoading: boolean;
  isProjectNotFound: boolean;
  isOrgNotFound: boolean;
  hasOrgHandle: boolean;
};

export function useProjectWithOrg(projectId: string): UseProjectWithOrgResult {
  const projectsService = new ProjectsService(http);

  const projectQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsService.getProject(projectId),
    enabled: !!projectId,
  });

  const project = projectQuery.data;

  const orgQuery = useOrganizationQuery({
    orgHandle: project?.github_handle ?? null,
    enabled: !!project?.github_handle,
  });

  const organizationData = orgQuery.data;
  const hasOrgHandle = !!project?.github_handle;

  const isLoading =
    projectQuery.isLoading || (orgQuery.isLoading && hasOrgHandle);

  const isProjectNotFound = projectQuery.isFetched && !project;
  const isOrgNotFound = hasOrgHandle && orgQuery.isFetched && !organizationData;

  return {
    project,
    organizationData,
    isLoading,
    isProjectNotFound,
    isOrgNotFound,
    hasOrgHandle,
  };
}
