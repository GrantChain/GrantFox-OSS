"use client";

import { memo, useMemo } from "react";
import { useGitHubIssueComments } from "@/features/github/hooks/useGitHubRepos";
import { LoaderCard } from "@/components/ui/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessageSquareText } from "lucide-react";
import { CommentCard } from "@/components/shared/CommentCard";
import type { Comment } from "@/types/Github";

export interface CommentsProps {
  /** GitHub organization or user */
  org: string;
  /** Repository name */
  repo: string;
  /** Issue number to show comments for */
  issueNumber: number;
}

export const Comments = memo(function Comments({
  org,
  repo,
  issueNumber,
}: CommentsProps) {
  const { data, isLoading, isError } = useGitHubIssueComments(
    org,
    repo,
    issueNumber,
    { per_page: 100 }
  );

  const commentsForIssue: Comment[] = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  if (isLoading) {
    return (
      <LoaderCard
        title="Loading comments…"
        subtitle="Fetching the latest conversation."
      />
    );
  }

  if (isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageSquareText />
          </EmptyMedia>
          <EmptyTitle>Comments unavailable</EmptyTitle>
          <EmptyDescription>
            We couldn't load the comments. Please try again later.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (commentsForIssue.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageSquareText />
          </EmptyMedia>
          <EmptyTitle>No comments yet</EmptyTitle>
          <EmptyDescription>
            Be the first to start the conversation on GitHub.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      <h2 className="mb-6 ml-4 text-2xl font-bold text-foreground">Comments</h2>

      <div className="space-y-0">
        {commentsForIssue.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
});
