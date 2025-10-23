import { Maintainer } from "./maintainer.type";
import { Repository } from "./repositories.type";

export interface Project {
  project_id: string;
  name: string;
  github_handle: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  category: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED";
  created_by: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string;
  maintainers: Maintainer[];
  repositories: Repository[];
}
