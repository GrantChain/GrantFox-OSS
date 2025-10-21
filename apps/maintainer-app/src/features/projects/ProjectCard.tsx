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
import { Project } from "@/types/project.type";
import { GitFork, Users } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme();
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      web: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      mobile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      backend:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      devops:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      ai: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    };
    return (
      colors[category?.toLowerCase()] ||
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
    );
  };

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      className="p-4 md:p-6 rounded-2xl cursor-pointer h-full flex flex-col"
    >
      <CardHeader className="p-0 mb-4 relative">
        <div className="relative w-full rounded-lg overflow-hidden bg-muted">
          <Image
            src="/favicon.ico"
            alt={project.name}
            className="object-cover"
            width={500}
            height={500}
          />
        </div>
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
        >
          {project.status}
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
                  className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.tech_stack.length > 4 && (
                <span className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground font-medium">
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

      <CardFooter className="p-0 mt-4 gap-2 flex flex-col sm:flex-row">
        <Button className="flex-1 text-sm">Explore</Button>
        <Button variant="outline" className="flex-1 text-sm bg-transparent">
          Learn More
        </Button>
      </CardFooter>
    </MagicCard>
  );
}
