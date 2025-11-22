import { IssueReward } from "./issue.type";
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
  issues: IssueReward[];
};
