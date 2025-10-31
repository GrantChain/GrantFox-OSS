import { githubHttp } from "@/lib/http";

export class GitHubSearchService {
  async searchRepositories(params: {
    q: string;
    sort?: "stars" | "forks" | "updated";
    order?: "desc" | "asc";
    per_page?: number;
    page?: number;
  }) {
    const { data } = await githubHttp.get("/search/repositories", { params });
    return data;
  }

  async searchUsers(params: { q: string; per_page?: number; page?: number }) {
    const { data } = await githubHttp.get("/search/users", { params });
    return data;
  }
}
