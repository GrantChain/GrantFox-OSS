import { githubHttp } from "@/lib/http";
import { SearchIssuesResponse } from "@/types/Github";

export class GitHubApplicationsService {
  async getIssuesApplication({
    label,
    username,
    state,
  }: {
    label: string;
    username: string;
    state: "open" | "closed";
  }): Promise<SearchIssuesResponse> {
    const { data } = await githubHttp.get(
      `/search/issues?q=label:${label}+is:issue+commenter:${username}+state:${state}+-author:${username}`
    );
    return data;
  }
}
