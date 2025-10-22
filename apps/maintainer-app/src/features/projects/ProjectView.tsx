"use client";

import { ProjectCard } from "./ProjectCard";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useProjectQuery } from "./hooks/useProjectQuery";
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";

export const ProjectView = () => {
  const { user, loading } = useUser();
  const { data: projects, isFetching } = useProjectQuery({
    userId: user?.id,
    enabled: !loading,
  });

  if (projects?.length === 0 && !projects) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">No projects found</span>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects to the OSS community
          </p>
        </div>

        <Link href="/maintainer/projects/management?mode=create">
          <RainbowButton size="lg" variant="outline">
            Add Project
          </RainbowButton>
        </Link>
      </div>

      {isFetching ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading projects...
          </span>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
