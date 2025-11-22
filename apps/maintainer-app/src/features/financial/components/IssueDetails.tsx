import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, GitPullRequest, SaveIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format";
import {
  formatAddress,
  formatCurrency,
} from "@/components/tw-blocks/helpers/format.helper";
import { IssueReward } from "@/types/issue.type";
import { Alert } from "@/components/shared/Alert";
import { useRewardSelection } from "../context/RewardSelectionContext";

interface IssueDetailsProps {
  selectedIssue: IssueReward | null;
  onSaveAmount: (issueId: number, amount: number) => void;
}

export const IssueDetails = ({
  selectedIssue,
  onSaveAmount,
}: IssueDetailsProps) => {
  const [amountInput, setAmountInput] = useState<string>("");
  const { setAmount, getAmount } = useRewardSelection();

  useEffect(() => {
    if (!selectedIssue) {
      setAmountInput("");
      return;
    }
    const ctxAmount = getAmount(selectedIssue.issue_id);
    if (ctxAmount !== undefined) {
      setAmountInput(ctxAmount.toString());
    } else {
      setAmountInput(selectedIssue.amount?.toString() ?? "");
    }
  }, [selectedIssue, getAmount]);

  const handleSaveAmount = () => {
    if (!selectedIssue || !amountInput) return;
    const amount = Number.parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) return;
    setAmount(selectedIssue.issue_id, amount);
    setAmountInput("");
  };

  const isWalletMissing =
    !!selectedIssue?.contributor_exists &&
    !!selectedIssue?.contributor_info &&
    !selectedIssue.contributor_info.primary_wallet;
  const isContributorMissing =
    !!selectedIssue && !selectedIssue.contributor_exists;
  const disableRewardActions = isWalletMissing || isContributorMissing;

  return (
    <Card className="p-6 flex flex-col">
      {selectedIssue ? (
        <>
          <div className="p-4 rounded-lg border-2">
            <label className="text-base font-semibold mb-3 block">
              Reward Amount
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Enter amount in USD"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  min="0"
                  step="0.01"
                  className="h-11 text-base"
                  disabled={disableRewardActions}
                />
              </div>
              <Button
                onClick={handleSaveAmount}
                className="h-11 px-6 cursor-pointer"
                disabled={!amountInput || disableRewardActions}
              >
                <SaveIcon />
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-sm">
                  Issue #{selectedIssue.issue_number}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {selectedIssue.repository.name}
                </span>
              </div>

              <Link href={selectedIssue.html_url} target="_blank">
                <h2 className="text-xl font-semibold leading-tight hover:underline">
                  {selectedIssue.title}
                </h2>
              </Link>
            </div>

            {selectedIssue.contributor_exists &&
            selectedIssue.contributor_info ? (
              <Link
                href={`https://github.com/${selectedIssue.contributor_info.username}`}
                target="_blank"
              >
                <Card className="p-4 gap-2">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                    Contributor
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={`https://github.com/${selectedIssue.contributor_info.username}.png`}
                        />
                        <AvatarFallback className="text-base font-semibold">
                          {selectedIssue.contributor_info.username
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base">
                          {selectedIssue.contributor_info.username}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {selectedIssue.contributor_info.email}
                        </p>
                      </div>
                      {selectedIssue.contributor_info.has_contributor_role && (
                        <Badge variant="default">Verified</Badge>
                      )}
                    </div>
                    <div className="pl-15">
                      <p className="text-sm text-muted-foreground mb-2">
                        Wallet Address
                      </p>
                      {selectedIssue.contributor_info.primary_wallet ? (
                        <p className="text-xs font-mono bg-background px-2 py-1 rounded border truncate">
                          {formatAddress(
                            selectedIssue.contributor_info.primary_wallet
                          )}
                        </p>
                      ) : (
                        <Alert
                          variant="warning"
                          title="Contributor has no primary wallet"
                          description="This contributor does not have a primary wallet set. You cannot allocate a reward until they add one."
                        />
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ) : (
              <Card className="p-4 gap-2">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Contributor
                </h3>
                <Alert
                  variant="warning"
                  title="User is not registered as a contributor"
                  description="This user has not registered as a contributor on the platform. You cannot allocate a reward until they register and add a primary wallet."
                />
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Link href={selectedIssue.pull_request.pr_url} target="_blank">
                <Card className="p-4 gap-2">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    Pull Request
                  </p>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" /> #
                    {selectedIssue.pull_request.pr_number}
                  </p>
                </Card>
              </Link>

              <Card className="p-4 gap-2">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  Merged Date
                </p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedIssue.pull_request.merged_at)}
                </p>
              </Card>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Labels
              </p>
              <div className="flex gap-2 flex-wrap">
                {selectedIssue.labels.map((label, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Select an issue to view details
        </div>
      )}
    </Card>
  );
};
