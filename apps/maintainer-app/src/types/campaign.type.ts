import { Project } from "./project.type";
import { Repository } from "./repositories.type";

export type Campaign = {
  campaign_id: string;
  name: string;
  description: string;
  tags: string[];
  start_date: string;
  end_date: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT" | string;
  image_url: string;
  projects: Project[];
  total_projects: number;
  total_repositories: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  repositories: Repository[];
};

export type FinishedCampaignResults = {
  campaign_id: string;
  campaign_name: string;
  project_id: string;
  project_name: string;
  total_issues: number;
  total_eligible_contributors: number;
  issues: {
    issue_id: number;
    issue_number: number;
    title: string;
    html_url: string;
    labels: string[];
    repository: {
      name: string;
      github_url: string;
    };
    pull_request: {
      pr_number: number;
      pr_url: string;
      merged_at: string;
      author_github_username: string;
    };
    contributor_exists: boolean;
    contributor_info?: {
      user_id: string;
      username: string;
      email: string;
      has_contributor_role: boolean;
      primary_wallet: string;
    };
  }[];
};
