import { Maintainer } from "./maintainer.type";
import { Repository } from "./repository.type";

export enum ProjectStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CHANGES_REQUESTED = "CHANGES_REQUESTED",
}

export interface Project {
  project_id: string;
  name: string;
  github_handle: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  category: string;
  status: ProjectStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string;
  maintainers: Maintainer[];
  repositories: Repository[];
}
