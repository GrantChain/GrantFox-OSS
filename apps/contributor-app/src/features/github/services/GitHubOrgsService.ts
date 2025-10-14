import type { AxiosInstance } from "axios";

export class GitHubOrgsService {
  private readonly http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async listOrganizations(params?: { per_page?: number; since?: number }) {
    const { data } = await this.http.get("/organizations", { params });
    return data;
  }

  async getOrganization(org: string) {
    const { data } = await this.http.get(`/orgs/${org}`);
    return data;
  }

  async listUserOrganizations(
    username: string,
    params?: { per_page?: number; page?: number }
  ) {
    const { data } = await this.http.get(`/users/${username}/orgs`, { params });
    return data;
  }

  async listOrgRepos(
    org: string,
    params?: { per_page?: number; page?: number; sort?: string; type?: string }
  ) {
    const { data } = await this.http.get(`/orgs/${org}/repos`, { params });
    return data;
  }
}
