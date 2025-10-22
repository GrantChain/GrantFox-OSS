import {
  CampaignRepositoryPayload,
  Repository,
  RepositoryPayload,
  AddRepositoriesToCampaignResponse,
  CampaignRepository,
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
        `/repositories/project/${projectId}?includeInactive=false`
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
  ): Promise<AddRepositoriesToCampaignResponse> {
    try {
      const { data } = await this.http.post(
        `/campaign-repositories/campaign/${campaignId}/repositories`,
        repository
      );
      return data as AddRepositoriesToCampaignResponse;
    } catch (error) {
      throw new Error("Failed to add repository to campaign", { cause: error });
    }
  }

  async removeRepositoryFromCampaign(
    campaignId: string,
    repositoryId: string
  ): Promise<void> {
    try {
      await this.http.delete(
        `/campaign-repositories/campaign/${campaignId}/repositories/${repositoryId}`
      );
    } catch (error) {
      throw new Error("Failed to remove repository from campaign", {
        cause: error,
      });
    }
  }

  async getRepositoriesByCampaign(
    campaignId: string
  ): Promise<{ github_repo_id: number }[]> {
    try {
      const { data } = await this.http.get(
        `/campaign-repositories/campaign/${campaignId}/repositories`
      );
      // The API returns an array of CampaignRepositoryResponseDto items.
      // We normalize to a simple list of { github_repo_id } for the UI.
      const list = Array.isArray(data) ? data : [];
      const normalized = list
        .map((item: CampaignRepository) => {
          const id = item?.repository?.github_repo_id ?? item?.repository_id;
          const num = Number(id);
          return Number.isFinite(num) ? { github_repo_id: num } : null;
        })
        .filter(
          (
            x: { github_repo_id: number } | null
          ): x is { github_repo_id: number } => Boolean(x)
        );
      return normalized;
    } catch (error) {
      throw new Error("Failed to get repositories by campaign", {
        cause: error,
      });
    }
  }
}
