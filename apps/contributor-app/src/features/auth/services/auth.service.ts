import {
  AddWalletResponse,
  ApiUser,
  UserPayload,
  UserRole,
  WalletValidationResponse,
} from "@/types/user.type";
import { Wallet } from "@/types/wallets.type";
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

  async getWallets(user_id: string): Promise<Wallet[]> {
    try {
      const { data } = await this.http.get(
        `/wallets/user/${user_id}?role=${UserRole.CONTRIBUTOR}`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get wallets", { cause: error });
    }
  }

  async walletExists(
    address: string,
    user_id: string
  ): Promise<WalletValidationResponse> {
    try {
      const { data } = await this.http.get(
        `/wallets/validate/${address}?userId=${user_id}&role=${UserRole.CONTRIBUTOR}`
      );
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
        role: UserRole.CONTRIBUTOR,
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

  async getPrimaryWallet(user_id: string): Promise<Wallet | null> {
    try {
      const { data } = await this.http.get(
        `/wallets/user/${user_id}/primary?role=${UserRole.CONTRIBUTOR}`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get primary wallet", { cause: error });
    }
  }
}
