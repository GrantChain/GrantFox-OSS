export type IssueReward = {
  issue_id: number;
  issue_number: number;
  title: string;
  html_url: string; // THIS
  labels: string[];
  repository: {
    name: string; // THIS
    github_url: string;
  };
  pull_request: {
    pr_number: number;
    pr_url: string; // THIS
    merged_at: string;
    author_github_username: string;
  };
  contributor_exists: boolean;
  contributor_info?: {
    user_id: string;
    username: string;
    email: string;
    has_contributor_role: boolean;
    primary_wallet: string | null;
  };
  amount?: number;
};
