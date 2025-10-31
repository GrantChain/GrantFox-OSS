"use client";

import { useQuery } from "@tanstack/react-query";
import { GitHubUsersService } from "../services/GitHubUsersService";

const usersService = new GitHubUsersService();

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["gh", "user", username],
    queryFn: () => usersService.getUser(username),
    enabled: Boolean(username),
  });
}
