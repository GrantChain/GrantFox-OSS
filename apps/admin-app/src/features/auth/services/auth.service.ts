import { User, UserPayload } from "@/types/user.type";
import { AxiosError, AxiosInstance } from "axios";

export class AuthService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async register(user: UserPayload) {
    try {
      const { data } = await this.http.post("/users", user);
      return data;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async getUser(user_id: string): Promise<User | null> {
    try {
      const { data } = await this.http.get(`/users/${user_id}`);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      }

      throw new Error("Failed to get user");
    }
  }
}
