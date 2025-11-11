"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { githubHttp } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { GitHubUser } from "@/types/github.type";

export interface UseGithubProfileResult {
  githubUser: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export function useGithubProfile(username: string): UseGithubProfileResult {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (userLoading) return;
    if (!user || user.user_metadata?.user_name !== username) {
      router.push("/signin");
    }
  }, [userLoading, user, username, router]);

  const {
    data,
    isPending,
    error: queryError,
  } = useQuery<GitHubUser, Error>({
    queryKey: ["github-user", username],
    queryFn: async () => {
      const response = await githubHttp.get(`/users/${username}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch GitHub user data");
      }
      return response.data as GitHubUser;
    },
    enabled:
      !userLoading && !!user && user.user_metadata?.user_name === username,

    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const loading = userLoading || isPending;
  const githubUser = (data as GitHubUser | undefined) ?? null;
  const error = queryError ? queryError.message : null;

  return { githubUser, loading, error };
}
