import { ApiUser } from "@/types/user.type";
import { AxiosInstance } from "axios";

export class GithubUserService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getGithubUsersByRole(): Promise<ApiUser[]> {
    try {
      const { data } = await this.http.get("/users/by-role/CONTRIBUTOR");
      return data;
    } catch (error) {
      throw new Error("Failed to get users by role", { cause: error });
    }
  }
}
