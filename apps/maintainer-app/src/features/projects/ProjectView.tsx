import { Project } from "@/types/project.type";
import { ProjectCard } from "./ProjectCard";
import { RainbowButton } from "@/components/ui/rainbow-button";

const projects: Project[] = [
  {
    project_id: "1",
    name: "Project 1",
    github_handle: "github_handle_1",
    short_description: "Short description 1",
    description: "Description 1",
    tech_stack: ["Tech stack 1"],
    category: "Category 1",
    status: "Status 1",
    created_by: "Created by 1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
    maintainers: [],
    repositories: [],
  },
  {
    project_id: "2",
    name: "Project 2",
    github_handle: "github_handle_2",
    short_description: "Short description 2",
    description: "Description 2",
    tech_stack: ["Tech stack 2"],
    category: "Category 2",
    status: "Status 2",
    created_by: "Created by 2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
    maintainers: [],
    repositories: [],
  },
  {
    project_id: "3",
    name: "Project 3",
    github_handle: "github_handle_3",
    short_description: "Short description 3",
    description: "Description 3",
    tech_stack: ["Tech stack 3"],
    category: "Category 3",
    status: "Status 3",
    created_by: "Created by 3",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
    maintainers: [],
    repositories: [],
  },
];

export const ProjectView = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects to the OSS community
          </p>
        </div>

        <RainbowButton size="lg" variant="outline">
          Add Project
        </RainbowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </div>
  );
};
