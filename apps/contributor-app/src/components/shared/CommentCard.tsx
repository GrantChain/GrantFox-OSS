"use client";

import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownRehypePlugins } from "@/lib/markdown";
import type { Comment } from "@/types/Github";
import { formatDate } from "@/lib/format";
import Link from "next/link";

export interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = memo(function CommentCard({
  comment,
}: CommentCardProps) {
  const username = comment.user?.login ?? "user";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-3 border-t border-border/50 py-4 px-4 first:border-t-0 hover:bg-muted/20 transition-colors">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage
          src={comment.user?.avatar_url || "/placeholder.svg"}
          alt={username}
        />
        <AvatarFallback className="bg-muted text-muted-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Link
            href={comment.user?.html_url ?? "#"}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-foreground hover:text-primary hover:underline"
          >
            {username}
          </Link>
          <Link
            href={comment.html_url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            aria-label="View comment on GitHub"
          >
            {formatDate(comment.created_at)}
          </Link>
          {comment.author_association &&
            comment.author_association !== "NONE" && (
              <Badge
                variant="outline"
                className="ml-auto text-xs border-border/60 bg-muted/30 capitalize"
              >
                {comment.author_association.toLowerCase()}
              </Badge>
            )}
        </div>

        <div className="prose prose-sm prose-invert max-w-none text-foreground/90 [&_a]:text-blue-400 [&_a]:no-underline hover:[&_a]:underline [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:overflow-x-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={markdownRehypePlugins}
          >
            {comment.body}
          </ReactMarkdown>
        </div>

        {comment.reactions && comment.reactions.total_count > 0 && (
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            {comment.reactions["+1"] > 0 && (
              <span>👍 {comment.reactions["+1"]}</span>
            )}
            {comment.reactions.heart > 0 && (
              <span>❤️ {comment.reactions.heart}</span>
            )}
            {comment.reactions.rocket > 0 && (
              <span>🚀 {comment.reactions.rocket}</span>
            )}
            {comment.reactions.laugh > 0 && (
              <span>😄 {comment.reactions.laugh}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
