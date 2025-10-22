"use client";

import { Project } from "@/types/project.type";
import { createContext, useContext, useMemo, useState } from "react";

export type ProjectContextType = {
  project: Project | null;
  setProject: (project: Project | null) => void;

  openDetails: boolean;
  setOpenDetails: (open: boolean) => void;

  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;

  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function useProjectContext(): ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const value = useMemo(
    () => ({
      project,
      setProject,
      openDetails,
      setOpenDetails,
      openEdit,
      setOpenEdit,
      openDelete,
      setOpenDelete,
    }),
    [project, openDetails, openEdit, openDelete]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
