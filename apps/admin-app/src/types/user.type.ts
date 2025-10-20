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
