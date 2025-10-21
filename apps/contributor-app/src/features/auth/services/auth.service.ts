import { ApiUser, UserPayload, UserRole } from "@/types";
import { AxiosError, AxiosInstance } from "axios";

export class AuthService {
  private readonly httpUnauthorized: AxiosInstance;

  constructor(httpUnauthorized: AxiosInstance) {
    this.httpUnauthorized = httpUnauthorized;
  }

  async register(user: UserPayload) {
    try {
      const { data } = await this.httpUnauthorized.post("/users", user);
      return data;
    } catch (error) {
      throw new Error("Failed to create user", { cause: error });
    }
  }

  async getUser(user_id: string): Promise<ApiUser | null> {
    try {
      const { data } = await this.httpUnauthorized.get(`/users/${user_id}`);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      }

      throw new Error("Failed to get user", { cause: error });
    }
  }

  async addRole(user_id: string, role: UserRole): Promise<ApiUser> {
    try {
      const { data } = await this.httpUnauthorized.post(
        `/users/${user_id}/roles`,
        { role }
      );
      return data;
    } catch (error) {
      throw new Error("Failed to add role to user", { cause: error });
    }
  }
}
