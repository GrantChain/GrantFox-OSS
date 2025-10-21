import {
  CampaignRepositoryPayload,
  Repository,
  RepositoryPayload,
} from "@/types/repositories.type";
import { AxiosInstance } from "axios";

export class RepositoriesService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getRepositoriesByProject(projectId: string): Promise<Repository[]> {
    try {
      const { data } = await this.http.get(
        `/repositories/project/${projectId}`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get repositories by project", {
        cause: error,
      });
    }
  }

  async addRepositoryToProject(
    projectId: string,
    repository: RepositoryPayload
  ): Promise<Repository> {
    try {
      const { data } = await this.http.post(
        `/repositories/project/${projectId}`,
        repository
      );
      return data;
    } catch (error) {
      throw new Error("Failed to create repository", { cause: error });
    }
  }

  async addRepositoryToCampaign(
    campaignId: string,
    repository: CampaignRepositoryPayload
  ): Promise<Repository> {
    try {
      const { data } = await this.http.post(
        `/campaign-repositories/campaign/${campaignId}/repositories`,
        repository
      );
      return data;
    } catch (error) {
      throw new Error("Failed to add repository to campaign", { cause: error });
    }
  }
}
