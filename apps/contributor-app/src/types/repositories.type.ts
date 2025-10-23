export interface Repository {
  github_repo_id: number;
  name: string;
  github_url: string;
  description: string;
  added_to_campaign_at: string;
  project_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignRepository {
  campaign_id: string;
  repository_id: number;
  created_at: string;
  updated_at: string;
  repository: Repository;
}

export type RepositoryPayload = Pick<
  Repository,
  "github_repo_id" | "github_url" | "name" | "description"
>;

export interface CampaignRepositoryPayload {
  repository_ids: number[];
}

export interface AddRepositoriesToCampaignErrorItem {
  repository_id: number;
  error: string;
}

export interface AddRepositoriesToCampaignResponse {
  message: string;
  added: Repository[];
  errors: AddRepositoriesToCampaignErrorItem[];
}
