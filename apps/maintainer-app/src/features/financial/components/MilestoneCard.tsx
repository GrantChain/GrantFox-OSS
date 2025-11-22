import { ApproveMilestoneButton } from "@/components/tw-blocks/escrows/single-multi-release/approve-milestone/button/ApproveMilestone";
import { formatAddress } from "@/components/tw-blocks/helpers/format.helper";
import { splitMilestoneDescription } from "@/components/tw-blocks/helpers/split-milestone.helper";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { MultiReleaseMilestone } from "@trustless-work/escrow/types";
import { AlertCircle, DollarSign, GitPullRequest, Info } from "lucide-react";
import Link from "next/link";

export function MilestoneCard({
  milestone,
  index,
  contractId,
  maintainerAddress,
}: {
  milestone: MultiReleaseMilestone;
  index: number;
  contractId: string;
  maintainerAddress: string;
}) {
  return (
    <Card className="p-6 flex flex-col h-full gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-foreground font-semibold text-sm">
              {index + 1}
            </div>
            {milestone.status && (
              <Badge variant="outline" className="text-xs uppercase">
                {milestone.status}
              </Badge>
            )}
          </div>

          {!milestone.flags?.approved &&
          !milestone.flags?.released &&
          !milestone.flags?.resolved &&
          !milestone.flags?.disputed &&
          milestone.status === "AUTHORIZED" ? (
            <ApproveMilestoneButton
              milestoneIndex={index}
              contractId={contractId}
              maintainerAddress={maintainerAddress}
            />
          ) : milestone.status === "REJECTED" ? (
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs uppercase">
                {milestone.status}
              </Badge>

              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="size-4 text-destructive" />
                </TooltipTrigger>
                <TooltipContent>
                  This milestone has been rejected. You cannot approve it.
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            milestone.status !== "AUTHORIZED" &&
            milestone.status !== "REJECTED" && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs uppercase">
                  PENDING AUTHORIZATION
                </Badge>

                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Once the GrantFox team validates the milestone, you will be
                    able to approve it. Then, the funds will be sent to the
                    contributor.
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {milestone.flags?.approved && (
            <Badge variant="success" className="text-xs uppercase">
              Approved
            </Badge>
          )}
          {milestone.flags?.released && (
            <Badge variant="secondary" className="text-xs uppercase">
              Released
            </Badge>
          )}
          {milestone.flags?.disputed && (
            <Badge variant="destructive" className="text-xs uppercase">
              Disputed
            </Badge>
          )}
          {milestone.flags?.resolved && (
            <Badge variant="outline" className="text-xs uppercase">
              Resolved
            </Badge>
          )}
        </div>
      </div>

      <Link
        className="flex-grow hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        href={
          splitMilestoneDescription(milestone.description, "issueLink") ?? ""
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground truncate">
          {splitMilestoneDescription(milestone.description, "title")}
        </p>
      </Link>

      <div className="space-y-3">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-1/2 items-center justify-between py-2.5 px-3 rounded-md bg-muted/50 min-h-12">
            <span className="flex gap-2 items-center text-xs font-medium text-muted-foreground">
              <DollarSign className="w-4 h-4" /> Amount
            </span>
            <span className="font-semibold text-sm">{milestone.amount}</span>
          </div>

          <Link
            href={
              splitMilestoneDescription(milestone.description, "prLink") ?? ""
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-1/2 items-center justify-between py-2.5 px-3 rounded-md bg-muted/50 min-h-12 hover:underline"
          >
            <span className="flex gap-2 items-center text-xs font-medium text-muted-foreground">
              <GitPullRequest className="w-4 h-4" /> PR
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-1.5 py-2.5 px-3 rounded-md bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">
            Contributor
          </span>
          <span className="font-mono text-xs break-all text-foreground/80">
            {formatAddress(milestone.receiver, 20)}
          </span>
        </div>
      </div>
    </Card>
  );
}
