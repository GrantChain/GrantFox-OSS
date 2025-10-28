import {
  Contributor,
  Issue,
  Readme,
  PullRequest,
  Comment,
} from "@/types/Github";
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

  async getPullRequest(
    owner: string,
    repo: string,
    pull_number: number
  ): Promise<PullRequest> {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/pulls/${pull_number}`
    );
    return data as PullRequest;
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
  ): Promise<Comment[]> {
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
  ): Promise<Comment[]> {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/issues/comments`,
      { params }
    );
    return data;
  }

  async getREADME(owner: string, repo: string): Promise<Readme> {
    const { data } = await this.http.get(`/repos/${owner}/${repo}/readme`);
    return data;
  }

  async listContributors(owner: string, repo: string): Promise<Contributor[]> {
    const { data } = await this.http.get(
      `/repos/${owner}/${repo}/contributors`
    );
    return data;
  }

  async getLanguages(
    owner: string,
    repo: string
  ): Promise<Record<string, number>> {
    const { data } = await this.http.get(`/repos/${owner}/${repo}/languages`);
    return data as Record<string, number>;
  }
}
