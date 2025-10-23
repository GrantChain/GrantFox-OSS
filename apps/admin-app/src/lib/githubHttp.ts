import axios from "axios";

export interface GitHubHttpConfig {
  baseURL?: string;
  token?: string | null;
}

export function createGitHubHttpClient(config: GitHubHttpConfig = {}) {
  return axios.create({
    baseURL: config.baseURL ?? "https://api.github.com",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
}

export const githubHttp = createGitHubHttpClient();
