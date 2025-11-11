import {
  AddWalletResponse,
  ApiUser,
  UserPayload,
  UserRole,
} from "@/types/user.type";
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
      throw new Error("Failed to create user", { cause: error });
    }
  }

  async getUser(user_id: string): Promise<ApiUser | null> {
    try {
      const { data } = await this.http.get(`/users/${user_id}`);
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
      const { data } = await this.http.post(`/users/${user_id}/roles`, {
        role,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to add role to user", { cause: error });
    }
  }

  async walletExists(
    address: string
  ): Promise<{ exists: boolean; address: string }> {
    try {
      const { data } = await this.http.get(`/wallets/validate/${address}`);
      return data;
    } catch (error) {
      throw new Error("Failed to check if wallet exists", { cause: error });
    }
  }

  async addWallet(
    user_id: string,
    address: string,
    is_primary: boolean = true
  ): Promise<AddWalletResponse> {
    try {
      const { data } = await this.http.post(`/wallets/user/${user_id}`, {
        address,
        is_primary,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to add wallet", { cause: error });
    }
  }

  async setPrimaryWallet(user_id: string, wallet_id: string): Promise<void> {
    try {
      await this.http.patch(
        `/wallets/user/${user_id}/${wallet_id}/set-primary`,
        {
          wallet_id,
        }
      );
    } catch (error) {
      throw new Error("Failed to set primary wallet", { cause: error });
    }
  }
}
