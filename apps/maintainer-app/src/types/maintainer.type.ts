import { Project } from "./project.type";

export type Maintainer = {
  user_id: string;
  email: string;
  username: string;
  avatar_url?: string;
};

export type MaintainerPayload = {
  maintainer_id: string;
  is_owner: boolean;
};

export type ProjectMaintainer = {
  id: string;
  project_id: string;
  maintainer_id: string;
  is_owner: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  maintainer?: Maintainer;
  project?: Project;
};
