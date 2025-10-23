import { githubHttp } from "@/lib/githubHttp";
import { GithubOrganization } from "@/types/github.type";

export class OrganizationsService {
  async getOrganization(org: string): Promise<GithubOrganization> {
    try {
      const { data } = await githubHttp.get(`/orgs/${org}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get organization", { cause: error });
    }
  }
}
