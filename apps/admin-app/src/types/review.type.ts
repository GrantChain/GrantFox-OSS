import { Maintainer } from "./maintainer.type";
import { Project, ProjectStatus } from "./project.type";

export type Review = {
  review_id: string;
  project_id: string;
  admin_id: string;
  action: ProjectStatus;
  reason: string;
  created_at: string;
  updated_at: string;
  admin: Maintainer;
  project: Project;
};

export type ReviewPayload = {
  action: ProjectStatus;
  reason: string;
};
