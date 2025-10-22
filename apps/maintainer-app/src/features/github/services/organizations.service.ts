import { githubHttp } from "@/lib/http";
import { GithubOrganization, UserOrganization } from "@/types/github.type";

export class OrganizationsService {
  async listOrganizations(params?: {
    per_page?: number;
    since?: number;
  }): Promise<GithubOrganization[]> {
    try {
      const { data } = await githubHttp.get("/organizations", { params });
      return data;
    } catch (error) {
      throw new Error("Failed to list organizations", { cause: error });
    }
  }

  async getOrganization(org: string): Promise<GithubOrganization> {
    try {
      const { data } = await githubHttp.get(`/orgs/${org}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get organization", { cause: error });
    }
  }

  async listUserOrganizations(
    username: string,
    params?: { per_page?: number; page?: number }
  ): Promise<UserOrganization[]> {
    try {
      const { data } = await githubHttp.get(`/users/${username}/orgs`, {
        params,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to list user organizations", { cause: error });
    }
  }

  async listOrgRepos(
    org: string,
    params?: { per_page?: number; page?: number; sort?: string; type?: string }
  ) {
    try {
      const { data } = await githubHttp.get(`/orgs/${org}/repos?type=public`, {
        params,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to list organization repositories", {
        cause: error,
      });
    }
  }

  async getOrganizationsByAuthenticatedUser(): Promise<UserOrganization[]> {
    try {
      const { data } = await githubHttp.get("/user/orgs");
      return data;
    } catch (error) {
      throw new Error("Failed to get organizations by authenticated user", {
        cause: error,
      });
    }
  }
}
