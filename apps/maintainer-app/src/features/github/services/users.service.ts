import { githubHttp } from "@/lib/http";
import { GitHubUser } from "@/types/github.type";

export class UsersService {
  async getUser(username: string): Promise<GitHubUser> {
    try {
      const { data } = await githubHttp.get(`/users/${username}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get GitHub user", { cause: error });
    }
  }
}
