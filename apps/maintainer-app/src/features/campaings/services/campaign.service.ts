import { Campaign, FinishedCampaignResults } from "@/types/campaign.type";
import { ApiUser, UserRole } from "@/types/user.type";
import { AxiosInstance } from "axios";

export class CampaignService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getActiveCampaignWithProjectsAndRepos({
    campaign_id,
  }: {
    campaign_id: string;
  }): Promise<Campaign> {
    try {
      const { data } = await this.http.get(
        `/campaigns/${campaign_id}/projects-with-repos`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get campaign with projects and repositories", {
        cause: error,
      });
    }
  }

  async getActiveCampaign(): Promise<Campaign[]> {
    try {
      const { data } = await this.http.get("/campaigns?status=ACTIVE");
      return data;
    } catch (error) {
      throw new Error("Failed to get active campaign", { cause: error });
    }
  }

  async getContributorsCampaign(campaignId: string): Promise<ApiUser[]> {
    try {
      const { data } = await this.http.get(
        `campaign-contributors/campaign/${campaignId}`
      );
      const contributors: Array<{
        contributor_id: string;
        username: string | null;
        email: string | null;
        avatar_url: string | null;
        registered_at?: string | null;
      }> = data?.contributors ?? [];

      return contributors.map((c) => ({
        user_id: c.contributor_id,
        email: c.email ?? "",
        username: c.username ?? null,
        avatar_url: c.avatar_url ?? null,
        roles: [UserRole.CONTRIBUTOR],
        is_active: true,
        created_at: c.registered_at ?? "",
        updated_at: c.registered_at ?? "",
      }));
    } catch (error) {
      throw new Error("Failed to get campaign contributors", { cause: error });
    }
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    try {
      const { data } = await this.http.get("/campaigns");
      return data;
    } catch (error) {
      throw new Error("Failed to get campaigns", { cause: error });
    }
  }

  async registerContributor(campaignId: string, userId: string): Promise<void> {
    try {
      await this.http.post(
        `/campaign-contributors/campaign/${campaignId}/register`,
        { "x-user-id": userId }
      );
    } catch (error) {
      throw new Error("Failed to register contributor", { cause: error });
    }
  }

  async getMergedIssuesInFinishedCampaign(
    campaignId: string,
    projectId: string
  ): Promise<FinishedCampaignResults[]> {
    try {
      const { data } = await this.http.get(
        `/campaigns/${campaignId}/projects/${projectId}/results`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get merged issues in finished campaign", {
        cause: error,
      });
    }
  }
}
