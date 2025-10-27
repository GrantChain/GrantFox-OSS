import { Issue } from "@/types/Github";
import type { AxiosInstance } from "axios";

export class GitHubReposService {
  private readonly http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getRepo(owner: string, repo: string) {
    const { data } = await this.http.get(`/repos/${owner}/${repo}`);
    return data;
  }

  async listIssues(
    owner: string,
    repo: string,
    params?: {
      per_page?: number;
      page?: number;
      state?: "open" | "closed" | "all";
      labels?: string;
    }
  ) {
    const { data } = await this.http.get(`/repos/${owner}/${repo}/issues`, {
      params,
    });
    return data;
  }

  async getIssue(
    owner: string,
    repo: string,
    issue_number: number
  ): Promise<Issue> {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/issues/${issue_number}`
    );
    return data;
  }

  async getIssueTimeline(
    owner: string,
    repo: string,
    issue_number: number,
    params?: { per_page?: number; page?: number }
  ) {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/issues/${issue_number}/timeline`,
      {
        params,
        headers: { Accept: "application/vnd.github.mockingbird-preview+json" },
      }
    );
    return data;
  }

  async listIssueComments(
    owner: string,
    repo: string,
    issue_number: number,
    params?: { per_page?: number; page?: number }
  ) {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
      { params }
    );
    return data;
  }

  async listAllIssueComments(
    owner: string,
    repo: string,
    params?: { per_page?: number; page?: number; since?: string }
  ) {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/issues/comments`,
      { params }
    );
    return data;
  }
}
