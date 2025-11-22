import { Campaign } from "./campaign.type";
import { Project } from "./project.type";
import { UserRole } from "./user.type";

export type ApiEscrow = {
  escrow_id: string;
  escrow_type: UserRole; // MAINTAINER or CONTRIBUTOR
  campaign_id: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  campaign: Pick<
    Campaign,
    | "campaign_id"
    | "name"
    | "description"
    | "status"
    | ("repositories" & {
        repositories: {
          repository_id: number;
          name: string;
          github_url: string;
          description: string;
        }[];
      })
  >;
  project: Pick<
    Project,
    "project_id" | "name" | "github_handle" | "short_description" | "status"
  >;
};
