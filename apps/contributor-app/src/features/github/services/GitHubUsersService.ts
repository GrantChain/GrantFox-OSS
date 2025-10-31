import { githubHttp } from "@/lib/http";

export class GitHubUsersService {
  async getUser(username: string) {
    const { data } = await githubHttp.get(`/users/${username}`);
    return data;
  }
}
