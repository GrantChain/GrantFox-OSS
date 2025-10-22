import { githubHttp } from "@/lib/http";
import { GitHubRepository } from "@/types/github.type";

export class GithubRepositoriesService {
  async getRepositoryById(id: number): Promise<GitHubRepository> {
    try {
      const { data } = await githubHttp.get(`/repositories/${id}`);
      return data as GitHubRepository;
    } catch (error) {
      throw new Error("Failed to get GitHub repository by ID", {
        cause: error,
      });
    }
  }
}
