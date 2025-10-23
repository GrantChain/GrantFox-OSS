"use client";

import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { ProjectsService } from "../services/projects.service";
import type { Project } from "@/types/project.type";

const projectsService = new ProjectsService(http);

export function getAllApprovedProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects", "active"],
    queryFn: () => projectsService.getAllApprovedProjects(),
    staleTime: 60_000,
  });
}
