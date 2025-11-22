"use client";

import { useState } from "react";
import { IssueReward } from "@/types/issue.type";
import { Card } from "@/components/ui/card";
import { IssueList } from "./IssueList";
import { IssueDetails } from "./IssueDetails";

interface IssuesManagerProps {
  issues: IssueReward[];
  onAmountUpdate: (issueId: number, amount: number) => void;
}

export const IssuesManager = ({
  issues,
  onAmountUpdate,
}: IssuesManagerProps) => {
  const [selectedIssue, setSelectedIssue] = useState<IssueReward | null>(
    issues[0] || null
  );

  const handleIssueClick = (issue: IssueReward) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <IssueList
        issues={issues}
        selectedIssueId={selectedIssue?.issue_id ?? null}
        onSelect={handleIssueClick}
      />

      <IssueDetails
        selectedIssue={selectedIssue}
        onSaveAmount={onAmountUpdate}
      />
    </div>
  );
};
