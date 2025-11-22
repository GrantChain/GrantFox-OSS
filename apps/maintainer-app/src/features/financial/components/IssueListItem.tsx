import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/components/tw-blocks/helpers/format.helper";
import { IssueReward } from "@/types/issue.type";
import { TriangleAlertIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useRewardSelection } from "../context/RewardSelectionContext";

interface IssueListItemProps {
  issue: IssueReward;
  selected: boolean;
  onClick: () => void;
}

export const IssueListItem = ({
  issue,
  selected,
  onClick,
}: IssueListItemProps) => {
  const { isSelected, toggleSelection, canSelectMore, getAmount } =
    useRewardSelection();
  const contributorMissing = !issue.contributor_exists;
  const walletMissing =
    !!issue.contributor_info && !issue.contributor_info.primary_wallet;
  const showEmergency = contributorMissing || walletMissing;
  const displayAmount = getAmount(issue.issue_id) ?? issue.amount ?? 0;
  return (
    <Card
      className={`relative overflow-hidden rounded-xl p-4 cursor-pointer transition-colors hover:bg-accent ${
        selected ? "border-muted-foreground/40" : ""
      }`}
      onClick={onClick}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-0 w-0 border-t-[18px] border-r-[18px] border-t-orange-500 border-r-transparent"
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground">
              #{issue.issue_number}
            </span>
            {showEmergency && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="destructive"
                    className="inline-flex items-center gap-1"
                  >
                    <TriangleAlertIcon className="h-3.5 w-3.5" />
                    Attention
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {contributorMissing
                      ? "This user is not registered as a contributor."
                      : "This contributor is missing a primary wallet."}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {displayAmount > 0 ? (
              <Badge variant="success" className="ml-auto">
                {formatCurrency(displayAmount || 0, "USDC")}
              </Badge>
            ) : (
              <Badge variant="destructive" className="ml-auto">
                {formatCurrency(0, "USDC")}
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium line-clamp-2">{issue.title}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {issue.repository.name}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mt-2 flex-wrap">
        {issue.labels.slice(0, 3).map((label, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            {label}
          </Badge>
        ))}
        {issue.labels.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{issue.labels.length - 3}
          </Badge>
        )}
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <label className="flex items-center gap-2 text-xs">
          <Checkbox
            checked={isSelected(issue.issue_id)}
            disabled={
              (displayAmount ?? 0) <= 0 ||
              (!isSelected(issue.issue_id) && !canSelectMore)
            }
            onCheckedChange={(checked) => {
              if (typeof checked === "boolean") {
                if ((displayAmount ?? 0) > 0) {
                  toggleSelection(issue.issue_id);
                }
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-muted-foreground select-none">
            Select for reward
          </span>
        </label>
      </div>
    </Card>
  );
};
