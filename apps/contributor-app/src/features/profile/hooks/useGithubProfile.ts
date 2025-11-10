"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { githubHttp } from "@/lib/http";
import { GitHubUser } from "@/types/Github";

export interface UseGithubProfileResult {
  githubUser: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches the GitHub profile for the given username and enforces that
 * the currently authenticated GrantFox user matches that username.
 */
export function useGithubProfile(username: string): UseGithubProfileResult {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading) return;

    if (!user || user.user_metadata?.user_name !== username) {
      router.push("/signin");
      return;
    }

    const fetchGitHubUser = async () => {
      try {
        setLoading(true);
        const response = await githubHttp.get(`/users/${username}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch GitHub user data");
        }
        setGithubUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubUser();
  }, [userLoading, user, username, router]);

  return { githubUser, loading: userLoading || loading, error };
}


