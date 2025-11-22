import { splitMilestoneDescription } from "@/components/tw-blocks/helpers/split-milestone.helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SingleReleaseMilestone,
  MultiReleaseMilestone,
  GetEscrowsFromIndexerResponse as Escrow,
} from "@trustless-work/escrow/types";
import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  GitPullRequest,
  Handshake,
  LinkIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { EntityCard } from "./EntityCard";
import { ChangeMilestoneStatusButton } from "@/components/tw-blocks/escrows/single-multi-release/change-milestone-status/button/ChangeMilestoneStatus";
import { ReleaseMilestoneButton } from "@/components/tw-blocks/escrows/multi-release/release-milestone/button/ReleaseMilestone";

interface EscrowMilestonesSectionProps {
  escrow: Escrow | null;
}

const renderMilestoneBadges = (
  milestone: SingleReleaseMilestone | MultiReleaseMilestone,
  escrowType: "single-release" | "multi-release" | undefined
): ReactNode[] => {
  const badges: ReactNode[] = [];

  // Status badge
  if (milestone.status) {
    badges.push(
      <Badge
        className="uppercase"
        key="status"
        variant={`${milestone.status === "AUTHORIZED" ? "success" : "outline"}`}
      >
        {milestone.status}
      </Badge>
    );
  }

  // Single Release badges
  if (escrowType === "single-release") {
    if ((milestone as SingleReleaseMilestone).approved) {
      badges.push(
        <Badge className="uppercase" key="approved" variant="success">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    }
  }
  // Multi Release badges
  else if (escrowType === "multi-release") {
    const multiMilestone = milestone as MultiReleaseMilestone;
    const flags = multiMilestone.flags;

    if (flags?.approved) {
      badges.push(
        <Badge className="uppercase" key="approved" variant="success">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    }

    if (flags?.disputed) {
      badges.push(
        <Badge className="uppercase" key="disputed" variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Disputed
        </Badge>
      );
    }

    if (flags?.released) {
      badges.push(
        <Badge className="uppercase" key="released" variant="success">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Released
        </Badge>
      );
    }

    if (flags?.resolved) {
      badges.push(
        <Badge className="uppercase" key="resolved" variant="success">
          <Handshake className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    }
  }

  return badges;
};

export const EscrowMilestonesSection = ({
  escrow,
}: EscrowMilestonesSectionProps) => {
  return (
    <div className="space-y-4">
      {escrow?.milestones.map(
        (
          milestone: SingleReleaseMilestone | MultiReleaseMilestone,
          index: number
        ) => (
          <div
            key={index}
            className="border rounded-lg p-6 bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-base font-semibold text-primary">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                {/* Title */}
                <h3 className="font-semibold text-lg leading-tight">
                  {splitMilestoneDescription(milestone.description, "title")}
                </h3>

                {(splitMilestoneDescription(
                  milestone.description,
                  "issueLink"
                ) ||
                  splitMilestoneDescription(
                    milestone.description,
                    "prLink"
                  )) && (
                  <div className="flex items-center gap-4">
                    {splitMilestoneDescription(
                      milestone.description,
                      "issueLink"
                    ) && (
                      <Link
                        href={
                          splitMilestoneDescription(
                            milestone.description,
                            "issueLink"
                          ) ?? ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Issue</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {splitMilestoneDescription(
                      milestone.description,
                      "prLink"
                    ) && (
                      <Link
                        href={
                          splitMilestoneDescription(
                            milestone.description,
                            "prLink"
                          ) ?? ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <GitPullRequest className="w-4 h-4" />
                        <span>Pull Request</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                )}

                {escrow?.type === "multi-release" && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Badge variant="outline" className="text-sm font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {(milestone as MultiReleaseMilestone).amount}
                    </Badge>

                    <div className="flex flex-wrap gap-2">
                      {renderMilestoneBadges(milestone, escrow?.type)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t space-y-4">
              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {!(milestone as MultiReleaseMilestone).flags?.approved &&
                  milestone.status !== "AUTHORIZED" && (
                    <ChangeMilestoneStatusButton
                      status="AUTHORIZED"
                      milestoneIndex={index}
                    />
                  )}

                {!(milestone as MultiReleaseMilestone).flags?.approved &&
                  milestone.status !== "REJECTED" && (
                    <ChangeMilestoneStatusButton
                      status="REJECTED"
                      milestoneIndex={index}
                    />
                  )}

                {(milestone as MultiReleaseMilestone).flags?.approved &&
                  milestone.status === "AUTHORIZED" &&
                  !(milestone as MultiReleaseMilestone).flags?.released && (
                    <ReleaseMilestoneButton milestoneIndex={index} />
                  )}
              </div>

              <EntityCard
                address={(milestone as MultiReleaseMilestone).receiver}
              />
            </div>

            {/* Evidence section */}
            {milestone.evidence && (
              <div className="mt-4 p-4 bg-muted/30 rounded-md border border-border/50">
                <p className="text-sm text-muted-foreground break-words">
                  <span className="font-medium text-foreground">Evidence:</span>{" "}
                  {milestone.evidence}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
