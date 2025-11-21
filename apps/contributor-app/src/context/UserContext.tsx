"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { supabase, type User } from "@/lib/supabase";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/api";
import { ApiUser, UserRole } from "@/types/user.type";
import { setRuntimeGitHubToken } from "@/lib/http";
import { PrimaryWallet } from "@/types/wallets.type";

type UserContextValue = {
  user: User | null;
  loading: boolean;
  apiUser: ApiUser | null;
  hasMaintainerRole: boolean;
  hasContributorRole: boolean;
  maintainerPrimaryWallet: PrimaryWallet | null;
  contributorPrimaryWallet: PrimaryWallet | null;
  refreshApiUser: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiUser, setApiUser] = useState<ApiUser | null>(null);
  const authService = new AuthService(http);

  useEffect(() => {
    // Get initial session and ensure user exists/has role after redirect
    const syncUserAfterAuth = async (authedUser: User | null) => {
      if (!authedUser) return;

      try {
        const existing = await authService.getUser(authedUser.id);

        if (!existing) {
          await authService.register({
            user_id: authedUser.id,
            email: authedUser.email ?? "",
            username: authedUser.user_metadata?.user_name ?? "",
            avatar_url: authedUser.user_metadata?.avatar_url ?? "",
            role: UserRole.CONTRIBUTOR,
          });
          return;
        }

        const hasRole = (existing.roles ?? []).includes(UserRole.CONTRIBUTOR);
        if (!hasRole) {
          await authService.addRole(authedUser.id, UserRole.CONTRIBUTOR);
        }

        // Store API user with wallets to be used across the app
        setApiUser(existing);
      } catch (error) {
        console.error("Failed to sync user with API:", error);
      }
    };

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      // Set GitHub token from user session
      setRuntimeGitHubToken(session?.provider_token ?? null);
      setLoading(false);
      await syncUserAfterAuth(currentUser);
    };

    init();

    // Listen for auth changes (covers redirect back from GitHub)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const authedUser = session?.user ?? null;
      setUser(authedUser);
      // Update GitHub token on auth changes
      setRuntimeGitHubToken(session?.provider_token ?? null);
      setLoading(false);
      // Run sync on LOGIN and TOKEN_REFRESH to ensure roles are up-to-date
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await syncUserAfterAuth(authedUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function signInWithGitHub() {
    const rawRedirectUrl =
      process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? `${window.location.origin}`;
    const redirectUrl = rawRedirectUrl.replace(/\/+$/, "");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectUrl,
        scopes: "read:user user:email read:org",
      },
    });

    if (error) {
      console.error("Error signing in with GitHub:", error);
    }
  }

  const hasMaintainerRole = useMemo<boolean>(() => {
    return (apiUser?.roles ?? []).includes(UserRole.MAINTAINER);
  }, [apiUser?.roles]);

  const hasContributorRole = useMemo<boolean>(() => {
    return (apiUser?.roles ?? []).includes(UserRole.CONTRIBUTOR);
  }, [apiUser?.roles]);

  const maintainerPrimaryWallet = useMemo<PrimaryWallet | null>(() => {
    const list = apiUser?.primaryWallets ?? [];
    const found = list.find((w) => w.role === UserRole.MAINTAINER) ?? null;
    return found ?? null;
  }, [apiUser?.primaryWallets]);

  const contributorPrimaryWallet = useMemo<PrimaryWallet | null>(() => {
    const list = apiUser?.primaryWallets ?? [];
    const found = list.find((w) => w.role === UserRole.CONTRIBUTOR) ?? null;
    return found ?? null;
  }, [apiUser?.primaryWallets]);

  const refreshApiUser = useCallback(async () => {
    if (!user) return;

    try {
      const existing = await authService.getUser(user.id);
      setApiUser(existing);
    } catch (error) {
      console.error("Failed to refresh API user:", error);
    }
  }, [user]);

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      loading,
      apiUser,
      hasMaintainerRole,
      maintainerPrimaryWallet,
      contributorPrimaryWallet,
      hasContributorRole,
      refreshApiUser,
      signOut,
      signInWithGitHub,
    }),
    [
      user,
      loading,
      apiUser,
      hasMaintainerRole,
      maintainerPrimaryWallet,
      contributorPrimaryWallet,
      hasContributorRole,
      refreshApiUser,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
