export interface Project {
  project_id: string;
  name: string;
  github_handle: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  category: string;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string;
  maintainers: string[]; // todo: add maintainer type
  repositories: string[]; // todo: add repository type
}

export interface ValidateGitHubHandleResponse {
  exists: boolean;
  github_handle: string;
  project?: Pick<Project, "project_id" | "name" | "status">;
}

export type ProjectPayload = Pick<
  Project,
  | "name"
  | "github_handle"
  | "short_description"
  | "description"
  | "tech_stack"
  | "category"
>;
