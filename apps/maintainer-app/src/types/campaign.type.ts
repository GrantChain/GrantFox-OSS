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
  created_by: string;
  created_at: string;
  updated_at: string;
  repositories: Repository[];
};
