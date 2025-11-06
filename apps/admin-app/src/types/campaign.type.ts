import { Project } from "./project.type";
import { Repository } from "./repository.type";
import { Maintainer } from "./maintainer.type";

export enum CampaignStatus {
  PENDING = "PENDING",
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Campaign {
  campaign_id: string;
  name: string;
  description: string;
  tags: string[];
  start_date: string;
  end_date: string;
  status: CampaignStatus;
  image_url: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  repositories: Repository[];
}

export type CampaignProject = Omit<
  Project,
  | "created_by"
  | "created_at"
  | "updated_at"
  | "reviewed_at"
  | "status"
  | "maintainers"
  | "repositories"
> & {
  maintainers: Omit<Maintainer, "email" | "joined_at">[];
  repositories: Repository[];
};

export type CampaignWithProjectsAndRepos = {
  campaign: Campaign;
  projects: CampaignProject[];
  total_projects: number;
  total_repositories: number;
};

export type CampaignPayload = Pick<
  Campaign,
  "name" | "description" | "tags" | "start_date" | "end_date" | "image_url"
>;
