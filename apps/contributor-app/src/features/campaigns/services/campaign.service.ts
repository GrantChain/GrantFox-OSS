import { Campaign } from "@/types/campaign.type";
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
}
