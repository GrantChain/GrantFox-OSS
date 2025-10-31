import { Badge } from "@/components/ui/badge";
import { memo } from "react";

export interface IssueHeaderProps {
  /** Issue number */
  issueNumber: number;
  /** Issue title */
  title: string;
  /** Issue state string (e.g., open/closed) */
  state: string;
}

export const IssueHeader = memo(function IssueHeader({
  issueNumber,
  title,
  state,
}: IssueHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl md:text-5xl font-bold break-words leading-tight text-balance">
            #{issueNumber}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mt-2 break-words text-balance">
            {title}
          </p>
        </div>
        <Badge variant="outline">{state.toUpperCase()}</Badge>
      </div>
    </div>
  );
});


