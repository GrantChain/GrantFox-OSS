import { Campaign } from "./campaign.type";

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

export interface CampaignRepository {
  campaign_id: string;
  repository_id: number;
  created_at: string;
  updated_at: string;
  campaign: Campaign;
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
