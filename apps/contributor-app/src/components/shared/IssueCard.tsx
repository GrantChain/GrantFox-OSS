"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Issue, IssueLabel } from "@/types/Github";
import { Badge } from "../ui/badge";
import Image from "next/image";

export interface IssueCardProps {
  org: string;
  repo: string;
  issue: Issue;
}

export function IssueCard({ org, repo, issue }: IssueCardProps) {
  return (
    <Link href={`/campaigns/org/${org}/repo/${repo}/issue/${issue.number}`}>
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-medium">
            #{issue.number} {issue.title}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{issue.comments} comments</span>
          </div>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Opened by {issue.user?.login} on{" "}
          {new Date(issue.created_at).toLocaleDateString()}
        </div>

        {Array.isArray(issue.labels) && issue.labels.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1 mt-2">
            {issue.labels.map((l: IssueLabel, idx: number) => {
              const name: string = l.name;
              return (
                <Badge variant="secondary" key={idx}>
                  {name}
                </Badge>
              );
            })}
          </div>
        ) : null}
        <div className="mt-2 flex items-center justify-end gap-2">
          {Array.isArray(issue.assignees) && issue.assignees.length > 0 ? (
            <>
              <Badge variant="outline">Assigned</Badge>
              <div className="flex items-center gap-1">
                {issue.assignees.slice(0, 3).map((assignee) => (
                  <Image
                    key={assignee.id}
                    src={assignee.avatar_url ?? ""}
                    alt={assignee.login}
                    width={20}
                    height={20}
                    className="rounded-full border border-border"
                  />
                ))}
                {issue.assignees.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{issue.assignees.length - 3}
                  </span>
                )}
              </div>
            </>
          ) : (
            <Badge variant="outline">Unassigned</Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default IssueCard;
