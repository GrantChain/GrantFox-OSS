import { githubHttp } from "@/lib/http";

export class GitHubOrgsService {
  async listOrganizations(params?: { per_page?: number; since?: number }) {
    const { data } = await githubHttp.get("/organizations", { params });
    return data;
  }

  async getOrganization(org: string) {
    const { data } = await githubHttp.get(`/orgs/${org}`);
    return data;
  }

  async listUserOrganizations(
    username: string,
    params?: { per_page?: number; page?: number }
  ) {
    const { data } = await githubHttp.get(`/users/${username}/orgs`, {
      params,
    });
    return data;
  }

  async listOrgRepos(
    org: string,
    params?: { per_page?: number; page?: number; sort?: string; type?: string }
  ) {
    const { data } = await githubHttp.get(`/orgs/${org}/repos`, { params });
    return data;
  }
}
