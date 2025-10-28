import axios, { type AxiosInstance } from "axios";
import { supabase } from "@/lib/supabase";

let runtimeGitHubToken: string | null = null;

export function setRuntimeGitHubToken(token: string | null) {
  runtimeGitHubToken = token;
}

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

  instance.interceptors.request.use(async (req) => {
    // Prefer in-memory token; fallback to config; finally try Supabase session
    let token = runtimeGitHubToken ?? config.token ?? null;

    if (!token) {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        token = session?.provider_token ?? null;
        if (token) {
          runtimeGitHubToken = token;
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get GitHub token", { cause: error });
      }
    }

    if (token) {
      req.headers = req.headers ?? {};
      req.headers.Authorization = `Bearer ${token}`;
      req.headers["X-GitHub-Api-Version"] = "2022-11-28";
      // The browser forbids setting the User-Agent header. Only set it on the server.
      if (typeof window === "undefined" && !req.headers["User-Agent"]) {
        req.headers["User-Agent"] = "GrantFox-App";
      }
    }
    return req;
  });

  return instance;
}

export const githubHttp = createGitHubHttpClient();
