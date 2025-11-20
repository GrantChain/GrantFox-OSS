import { Card } from "@/components/ui/card";
import { IssueReward } from "@/types/issue.type";
import { IssueListItem } from "./IssueListItem";
import { useRewardSelection } from "../context/RewardSelectionContext";
import { SelectionLimitAlert } from "./SelectionLimitAlert";

interface IssueListProps {
  issues: IssueReward[];
  selectedIssueId: number | null;
  onSelect: (issue: IssueReward) => void;
}

export const IssueList = ({
  issues,
  selectedIssueId,
  onSelect,
}: IssueListProps) => {
  const { canSelectMore, selectedCount, limit } = useRewardSelection();
  return (
    <Card className="p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Eligible Issues</h3>
        <span className="text-sm text-muted-foreground">
          Allowed Issues to Reward: {selectedCount}/{limit}
        </span>
      </div>
      <SelectionLimitAlert limitReached={!canSelectMore} limit={limit} />
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-300px)] min-h-[500px]">
        {issues.map((issue) => (
          <IssueListItem
            key={issue.issue_id}
            issue={issue}
            selected={selectedIssueId === issue.issue_id}
            onClick={() => onSelect(issue)}
          />
        ))}
      </div>
    </Card>
  );
};
