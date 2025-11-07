import {
  Campaign,
  CampaignStatus,
  CampaignPayload,
  CampaignWithProjectsAndRepos,
} from "@/types/campaign.type";
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
      throw new Error("Failed to get campaigns", { cause: error });
    }
  }

  async getCampaign(id: string): Promise<Campaign> {
    try {
      const { data } = await this.http.get(`/campaigns/${id}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get campaign", { cause: error });
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

  async createCampaign(campaign: CampaignPayload | FormData) {
    try {
      const isForm =
        typeof FormData !== "undefined" && campaign instanceof FormData;
      const { data } = await this.http.post("/campaigns", campaign, {
        headers: isForm ? { "Content-Type": "multipart/form-data" } : undefined,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to create campaign", { cause: error });
    }
  }

  async updateCampaign(id: string, campaign: CampaignPayload | FormData) {
    try {
      const isForm =
        typeof FormData !== "undefined" && campaign instanceof FormData;
      const { data } = await this.http.patch(`/campaigns/${id}`, campaign, {
        headers: isForm ? { "Content-Type": "multipart/form-data" } : undefined,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to update campaign", { cause: error });
    }
  }

  async updateCampaignStatus(id: string, status: CampaignStatus) {
    try {
      const { data } = await this.http.patch(`/campaigns/${id}/status`, {
        status,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to update campaign status", { cause: error });
    }
  }

  async getActiveCampaignsWithProjects(): Promise<Campaign[]> {
    try {
      const { data } = await this.http.get("/campaigns/active/with-projects");
      return data;
    } catch (error) {
      throw new Error("Failed to get active campaigns with projects", {
        cause: error,
      });
    }
  }

  async getCampaignWithProjectsAndRepos(
    id: string
  ): Promise<CampaignWithProjectsAndRepos> {
    try {
      const { data } = await this.http.get(
        `/campaigns/${id}/projects-with-repos`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get campaign with details", { cause: error });
    }
  }
}
