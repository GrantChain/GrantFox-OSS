import { Campaign } from "@/types/campaign.type";
import { ApiUser } from "@/types/user.type";
import { AxiosInstance } from "axios";

export class CampaignService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
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
      const { data } = await this.http.get(`campaign-contributors/campaign/${campaignId}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get active campaign", { cause: error });
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
    console.log({ campaignId, userId })
    try {
      await this.http.post(`/campaign-contributors/campaign/${campaignId}/register`, { "x-user-id": userId });
    } catch (error) {
      console.log({ error })
      throw new Error("Failed to register contributor", { cause: error });
    }
  }
}
