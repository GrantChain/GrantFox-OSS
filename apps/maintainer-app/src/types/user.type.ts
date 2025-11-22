import { PrimaryWallet, Wallet } from "./wallets.type";

export enum UserRole {
  ADMIN = "ADMIN",
  MAINTAINER = "MAINTAINER",
  CONTRIBUTOR = "CONTRIBUTOR",
}

export interface User {
  id: string;
  email?: string;
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
    user_name?: string;
    name?: string;
  };
  created_at?: string;
}

export type UserPayload = {
  user_id: string;
  email: string;
  username: string;
  avatar_url: string;
  role: UserRole;
};

// API response from Core API `/users/:id`
export interface ApiUser {
  user_id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  roles: UserRole[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  wallets?: Wallet[];
  primaryWallets?: PrimaryWallet[];
}

export type AddWalletResponse = {
  wallet_id: string;
  user_id: string;
  address: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
};

export type WalletValidationResponse = {
  canUse: boolean;
  exists: boolean;
  reason: string;
  address: string;
  count: number;
  roles: UserRole[];
  existingWallets: {
    role: UserRole;
    is_primary: boolean;
  }[];
};
