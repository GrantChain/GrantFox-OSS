import { SearchIssuesResponse } from "@/types/Github";
import type { AxiosInstance } from "axios";

export class GitHubApplicationsService {
  private readonly http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getIssuesApplication({
    label,
    username,
    state,
  }: {
    label: string;
    username: string;
    state: "open" | "closed";
  }): Promise<SearchIssuesResponse> {
    const { data } = await this.http.get(
      `/search/issues?q=label:${label}+is:issue+commenter:${username}+state:${state}`
    );
    return data;
  }
}
