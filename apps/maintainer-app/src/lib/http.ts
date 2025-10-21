import axios, { type AxiosInstance } from "axios";

export interface GitHubHttpConfig {
  baseURL?: string;
  token?: string | null;
}

export function createGitHubHttpClient(
  config: GitHubHttpConfig = {}
): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL ?? "https://api.github.com",
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  instance.interceptors.request.use((req) => {
    const token = config.token ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? null;
    if (token) {
      req.headers = req.headers ?? {};
      req.headers.Authorization = `Bearer ${token}`;
      req.headers["X-GitHub-Api-Version"] = "2022-11-28";
    }
    return req;
  });

  return instance;
}

export const githubHttp = createGitHubHttpClient();
