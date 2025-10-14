import type { AxiosInstance } from "axios";

export class GitHubUsersService {
  private readonly http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getUser(username: string) {
    const { data } = await this.http.get(`/users/${username}`);
    return data;
  }
}
