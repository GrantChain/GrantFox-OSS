import { Campaign } from "@/types/campaign.type";
import { AxiosInstance } from "axios";

export class CampaignService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const { data } = await this.http.get("/campaigns");
      return data;
    } catch (error) {
      throw new Error("Failed to get campaigns");
    }
  }

  async getCampaign(id: string): Promise<Campaign> {
    try {
      const { data } = await this.http.get(`/campaigns/${id}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get campaign");
    }
  }

  async createCampaign(campaign: Campaign) {
    try {
      const { data } = await this.http.post("/campaigns", campaign);
      return data;
    } catch (error) {
      throw new Error("Failed to create campaign");
    }
  }

  async updateCampaign(id: string, campaign: Campaign) {
    try {
      const { data } = await this.http.put(`/campaigns/${id}`, campaign);
      return data;
    } catch (error) {
      throw new Error("Failed to update campaign");
    }
  }

  async deleteCampaign(id: string) {
    try {
      const { data } = await this.http.delete(`/campaigns/${id}`);
      return data;
    } catch (error) {
      throw new Error("Failed to delete campaign");
    }
  }
}
