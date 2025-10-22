"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { projectSchema } from "../schemas/project.schema";
import { useProjectContext } from "@/context/ProjectContext";
import { ProjectsService } from "../services/projects.service";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useProjects = (options?: { mode?: "create" | "edit" }) => {
  const isEdit = (options?.mode ?? "create") === "edit";

  const projectsService = new ProjectsService(http);
  const { project } = useProjectContext();

  const router = useRouter();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      github_handle: project?.github_handle ?? "",
      name: project?.name ?? "",
      description: project?.description ?? "",
      short_description: project?.short_description ?? "",
      tech_stack: project?.tech_stack ?? [],
      category: project?.category ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      if (isEdit) {
        // await projectsService.updateProject(project?.id, values);
      } else {
        const created = await projectsService.createProject(values);
        toast.success("Project created successfully");
        router.push(`/maintainer/projects/${created.project_id}`);
        return;
      }

      toast.success("Project updated successfully");
      if (project?.project_id) {
        router.push(`/maintainer/projects/${project.project_id}`);
      }
      // queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  };

  return { form, onSubmit };
};
