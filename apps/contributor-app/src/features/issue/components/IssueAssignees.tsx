import { GithubUserCard } from "@/components/shared/GithubUserCard";
import { User } from "lucide-react";
import { memo } from "react";

export interface IssueAssigneesProps {
  /** Array of GitHub users */
  assignees: unknown[] | null | undefined;
}

export const IssueAssignees = memo(function IssueAssignees({
  assignees,
}: IssueAssigneesProps) {
  const hasAssignees = Array.isArray(assignees) && assignees.length > 0;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <User className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">Assigned to</span>
      </div>
      {hasAssignees ? (
        <div className="flex flex-wrap gap-2">
          {assignees!.map((assignee: unknown, idx: number) => (
            // We don't know exact shape here; GithubUserCard reads it safely
            <GithubUserCard key={idx} user={assignee} />
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground italic">Unassigned</span>
      )}
    </div>
  );
});


