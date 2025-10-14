import type { AxiosInstance } from "axios";

export class GitHubSearchService {
  private readonly http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async searchRepositories(params: {
    q: string;
    sort?: "stars" | "forks" | "updated";
    order?: "desc" | "asc";
    per_page?: number;
    page?: number;
  }) {
    const { data } = await this.http.get("/search/repositories", { params });
    return data;
  }

  async searchUsers(params: { q: string; per_page?: number; page?: number }) {
    const { data } = await this.http.get("/search/users", { params });
    return data;
  }
}
