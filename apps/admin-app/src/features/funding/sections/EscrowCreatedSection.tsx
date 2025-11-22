"use client";

import { CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { AlertCircle, Milestone as MilestoneIcon, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EntityCard } from "./EntityCard";
import { EscrowDetailsSection } from "./EscrowDetailsSection";
import { FinancialDetailsSection } from "./FinancialDetailsSection";
import { EscrowMilestonesSection } from "./EscrowMilestonesSection";
import { HeaderSection } from "./HeaderSection";
import {
  MultiReleaseMilestone,
  SingleReleaseMilestone,
  SingleReleaseEscrow,
  MultiReleaseEscrow,
} from "@trustless-work/escrow/types";
import { BalanceProgressDonut } from "@/components/tw-blocks/escrows/indicators/balance-progress/donut/BalanceProgress";

export const EscrowCreatedSection = () => {
  const { selectedEscrow } = useEscrowContext();

  const totalMilestones = selectedEscrow?.milestones.length || 0;

  // Calculate completed milestones based on escrow type
  const completedMilestones = (() => {
    if (!selectedEscrow || totalMilestones === 0) return 0;

    if (selectedEscrow.type === "single-release") {
      // For single-release: check escrow-level flags
      const singleEscrow = selectedEscrow as SingleReleaseEscrow;
      const isCompleted =
        singleEscrow.flags?.released === true ||
        singleEscrow.flags?.resolved === true;

      // If escrow is released or resolved, all milestones are completed
      return isCompleted ? totalMilestones : 0;
    } else {
      // For multi-release: count milestones with released or resolved flags
      const multiEscrow = selectedEscrow as MultiReleaseEscrow;
      return multiEscrow.milestones.filter(
        (m: MultiReleaseMilestone) =>
          m.flags?.released === true || m.flags?.resolved === true
      ).length;
    }
  })();

  const progressPercentage =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return selectedEscrow ? (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Card className="border-l-2 border-l-primary shadow-sm flex-1 w-full sm:w-1/2">
        <CardHeader className="pb-2">
          <HeaderSection escrow={selectedEscrow} />
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium">Escrow Progress</span>
              <span className="text-muted-foreground">
                {completedMilestones} of {totalMilestones} Milestones
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
            <div className="md:col-span-6">
              <EscrowDetailsSection escrow={selectedEscrow} />
            </div>

            <div className="md:col-span-4">
              <FinancialDetailsSection escrow={selectedEscrow} />
            </div>
          </div>

          <Separator className="my-6" />

          <BalanceProgressDonut
            contractId={selectedEscrow?.contractId || ""}
            target={
              selectedEscrow?.milestones.reduce(
                (acc, milestone) =>
                  acc + (milestone as MultiReleaseMilestone).amount,
                0
              ) || 0
            }
            currency={selectedEscrow?.trustline.name || "USDC"}
          />

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EntityCard
              name="Service Provider"
              address={selectedEscrow?.roles.serviceProvider || ""}
            />

            <EntityCard
              name="Approver"
              address={selectedEscrow?.roles.approver || ""}
            />

            <EntityCard
              name="Platform"
              address={selectedEscrow?.roles.platformAddress || ""}
            />

            <EntityCard
              name="Dispute Resolver"
              address={selectedEscrow?.roles.disputeResolver || ""}
            />

            <EntityCard
              name="Release Signer"
              address={selectedEscrow?.roles.releaseSigner || ""}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm w-full sm:w-1/2">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MilestoneIcon className="h-5 w-5 text-primary" />
            <CardTitle>Milestones</CardTitle>
          </div>
          <CardDescription>
            Once the Maintainer has created the escrow, you can approve or
            reject the milestones. If the milestones are approved, the
            Maintainer will be able to release the funds. If they are rejected,
            you will be able to raise a dispute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EscrowMilestonesSection escrow={selectedEscrow} />
        </CardContent>
      </Card>
    </div>
  ) : (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border-l-4 border-l-muted">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Escrow Available</h3>
        <p className="text-muted-foreground max-w-md">
          There is no escrow data to display at the moment. Please create a new
          escrow.
        </p>
      </CardContent>
    </Card>
  );
};
