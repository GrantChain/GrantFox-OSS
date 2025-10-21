export interface Repository {
  github_repo_id: number;
  project_id: string;
  github_url: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type RepositoryPayload = Pick<
  Repository,
  "github_repo_id" | "github_url" | "name" | "description"
>;

export interface CampaignRepositoryPayload {
  repository_ids: number[];
}
