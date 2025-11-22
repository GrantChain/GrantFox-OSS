import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IssueReward } from "@/types/issue.type";
import { formatCurrency } from "@/components/tw-blocks/helpers/format.helper";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

export const RewardSummaryDialog = ({
  open,
  onOpenChange,
  issues,
  getAmount,
  onConfirm,
  processing = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issues: IssueReward[];
  getAmount: (issueId: number) => number | undefined;
  onConfirm: () => void;
  processing?: boolean;
}) => {
  const totalAmount = useMemo(
    () =>
      issues.reduce((sum, issue) => sum + (getAmount(issue.issue_id) ?? 0), 0),
    [issues, getAmount]
  );

  return (
    <Dialog open={open} onOpenChange={processing ? () => {} : onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reward Contributors</DialogTitle>
          <DialogDescription>
            Review the selected issues and amounts before confirming. You
            won&apos;t be able to send rewards again after confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">No issues selected.</p>
          ) : (
            issues.map((issue) => {
              const amt = getAmount(issue.issue_id) ?? 0;
              return (
                <div
                  key={issue.issue_id}
                  className="flex items-start justify-between gap-4 border-b pb-3 last:border-b-0"
                >
                  <div className="min-w-0">
                    <Link href={issue.html_url} target="_blank">
                      <p className="text-sm font-medium truncate hover:underline">
                        #{issue.issue_number} — {issue.title}
                      </p>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {issue.repository.name}
                    </p>
                  </div>
                  <div className="shrink-0 text-sm font-semibold">
                    {formatCurrency(amt, "USDC")}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {issues.length > 0 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-semibold">{issues.length}</span>
            </p>
            <p className="text-sm">
              Total:{" "}
              <span className="font-semibold">
                {formatCurrency(totalAmount, "USDC")}
              </span>
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={processing}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="cursor-pointer" disabled={processing}>
            {processing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Processing ...
              </span>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
