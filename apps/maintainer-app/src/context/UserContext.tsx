"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase, type User } from "@/lib/supabase";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/api";
import { UserRole } from "@/types/user.type";
import { setRuntimeGitHubToken } from "@/lib/http";

type UserContextValue = {
  user: User | null;
  loading: boolean;
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
            role: UserRole.MAINTAINER,
          });
          return;
        }

        const hasRole = (existing.roles ?? []).includes(UserRole.MAINTAINER);
        if (!hasRole) {
          await authService.addRole(authedUser.id, UserRole.MAINTAINER);
        }
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/`,
        scopes: "read:user user:email read:org",
      },
    });

    if (error) {
      console.error("Error signing in with GitHub:", error);
    }
  }

  const value = useMemo<UserContextValue>(
    () => ({ user, loading, signOut, signInWithGitHub }),
    [user, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
