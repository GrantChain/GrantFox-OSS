"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { ProjectsTable } from "./ProjectsTable";
import { useProjectsQuery } from "./hooks/useProjectsQuery";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ProjectStatus } from "@/types/project.type";

export const ProjectsView = () => {
  const [status, setStatus] = React.useState<ProjectStatus | undefined>(
    undefined
  );
  const { data: projects, isLoading } = useProjectsQuery(status);

  const statuses: ProjectStatus[] = [
    ProjectStatus.PENDING,
    ProjectStatus.APPROVED,
    ProjectStatus.REJECTED,
    ProjectStatus.CHANGES_REQUESTED,
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Review the Projects</h2>
          <p className="text-muted-foreground">
            Review the projects submitted by the maintainers and approve or
            reject them.
          </p>
        </div>
        <div />
      </div>

      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading projects...
          </span>
        </Card>
      ) : projects && projects.length > 0 ? (
        <ProjectsTable projects={projects} />
      ) : (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            No projects found
          </span>
        </Card>
      )}
    </>
  );
};
