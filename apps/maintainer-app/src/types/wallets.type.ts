import { UserRole } from "./user.type";

export interface Wallet {
  wallet_id: string;
  user_id: string;
  address: string;
  role?: UserRole;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}
