import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubUserCard } from "@/components/shared/GithubUserCard";
import { Calendar, MessageSquare, GitPullRequest, Github } from "lucide-react";
import { memo } from "react";
import type { LinkedPullRequestSummary } from "../hooks/useLinkedPullRequest";

export interface IssueMetadataProps {
  /** GitHub user object */
  user: unknown;
  /** ISO date string */
  createdAt: string;
  /** Comments count */
  commentsCount: number;
  /** The linked PR, if any */
  linkedPR: LinkedPullRequestSummary;
  /** Whether the linked PR has been merged */
  isMerged: boolean;
  /** URL of the issue on GitHub */
  htmlUrl: string;
}

export const IssueMetadata = memo(function IssueMetadata({
  user,
  createdAt,
  commentsCount,
  linkedPR,
  isMerged,
  htmlUrl,
}: IssueMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <GithubUserCard user={user} />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 opacity-60" />
        <span>opened {new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 opacity-60" />
        <span>
          {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
        </span>
      </div>

      {linkedPR && (
        <Link
          href={linkedPR.html_url ?? "#"}
          target="_blank"
          rel="noreferrer"
          className={
            isMerged
              ? "inline-flex items-center gap-2 px-3 py-2 text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 border border-fuchsia-200 dark:border-fuchsia-700/50 rounded-lg hover:bg-fuchsia-100 dark:bg-fuchsia-900/50 dark:hover:bg-fuchsia-900 transition-colors duration-200 text-sm font-semibold"
              : "inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-foreground border border-border hover:bg-muted/80 transition-colors text-sm font-semibold"
          }
        >
          <GitPullRequest className="w-4 h-4" />
          {isMerged ? "PR Merged" : `PR #${linkedPR.number}`}
        </Link>
      )}

      <Button asChild size="lg" className="w-full sm:w-auto gap-2 font-semibold">
        <Link href={htmlUrl} target="_blank" rel="noreferrer">
          <Github className="w-5 h-5" />
          View on GitHub
        </Link>
      </Button>
    </div>
  );
});


