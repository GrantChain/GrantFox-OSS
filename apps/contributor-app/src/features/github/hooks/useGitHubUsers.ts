"use client";

import { useQuery } from "@tanstack/react-query";
import { githubHttp } from "@/lib/http";
import { GitHubUsersService } from "../services/GitHubUsersService";

const usersService = new GitHubUsersService(githubHttp);

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["gh", "user", username],
    queryFn: () => usersService.getUser(username),
    enabled: Boolean(username),
  });
}
