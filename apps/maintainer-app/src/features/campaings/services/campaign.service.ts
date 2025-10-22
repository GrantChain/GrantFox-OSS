import { Campaign } from "@/types/campaign.type";
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

  async getAllCampaigns(): Promise<Campaign[]> {
    try {
      const { data } = await this.http.get("/campaigns");
      return data;
    } catch (error) {
      throw new Error("Failed to get campaigns", { cause: error });
    }
  }
}
