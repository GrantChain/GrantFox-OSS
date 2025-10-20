import { Repository } from "./repository.type";

export enum CampaignStatus {
  PENDING = "PENDING",
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

export type CampaignPayload = Pick<
  Campaign,
  "name" | "description" | "tags" | "start_date" | "end_date" | "image_url"
>;
