"use client";

import { useQuery } from "@tanstack/react-query";
import { ProjectsService } from "../services/projects.service";
import { http } from "@/lib/api";
import { Project } from "@/types/project.type";

type UseProjectQueryOptions = {
  userId?: string | null;
  enabled?: boolean;
};

export function useProjectQuery(options: UseProjectQueryOptions) {
  const { userId, enabled = true } = options;

  return useQuery<Project[], Error>({
    queryKey: ["projects", { userId }],
    enabled: enabled && !!userId,
    queryFn: async () => {
      const service = new ProjectsService(http);
      return await service.getProjectsByUser(userId as string);
    },
  });
}
