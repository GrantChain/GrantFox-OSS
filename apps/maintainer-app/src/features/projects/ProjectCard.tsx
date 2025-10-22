"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { getCategoryColor } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { ArrowRight, CircleAlert, GitFork, Users } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme();

  return (
    <Link href={`/maintainer/projects/${project.project_id}`}>
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-4 md:p-6 rounded-2xl cursor-pointer h-full flex flex-col"
      >
        <CardHeader className="p-0 mb-4 relative">
          <div className="rounded-lg overflow-hidden justify-center items-center">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={`https://github.com/${project.github_handle}.png`}
                alt={project.name}
                className="object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <CardTitle className="text-lg md:text-xl mb-2 line-clamp-2">
            {project.name}
          </CardTitle>
          <CardDescription className="text-sm mb-4 line-clamp-2">
            {project.short_description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}
            >
              {project.category}
            </span>
          </div>

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground font-medium uppercase"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 4 && (
                  <span className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground font-medium uppercase">
                    +{project.tech_stack.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {project.maintainers?.length || 0}
              </span>
              <span className="text-xs text-muted-foreground">maintainers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {project.repositories?.length || 0}
              </span>
              <span className="text-xs text-muted-foreground">repos</span>
            </div>
          </div>
        </CardContent>

        {project.status !== "APPROVED" && (
          <div className="flex items-center gap-2 my-4">
            <CircleAlert className="w-6 h-6 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Once your project is approved by Stellar and GrantFox, you&apos;ll
              be able to register repositories to a campaign.
            </p>
          </div>
        )}

        <CardFooter className="p-0 mt-4 gap-2 flex justify-end">
          <Button className="flex-1 text-sm cursor-pointer" variant="outline">
            <ArrowRight className="w-4 h-4" />
            See Project
          </Button>
        </CardFooter>
      </MagicCard>
    </Link>
  );
}
