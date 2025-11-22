import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FinishedCampaignResults } from "@/types/campaign.type";
import { Tooltip } from "@/components/ui/tooltip-card";
import { Alert } from "@/components/shared/Alert";
import { useRewardSelection } from "../context/RewardSelectionContext";
import { useMemo, useState } from "react";
import { RewardSummaryDialog } from "./RewardSummaryDialog";
import { RainbowButton } from "@/components/ui/rainbow-button";
import type { IssueReward } from "@/types/issue.type";
import { useRewardContributor } from "../hooks/useRewardContributor";

export const ContributorPendingHeader = ({
  results,
}: {
  results: FinishedCampaignResults;
}) => {
  const { selectedIds, selectedCount, getAmount, clearAll } =
    useRewardSelection();
  const [open, setOpen] = useState(false);
  const { handleConfirm, isProcessing } = useRewardContributor();

  const selectedIssues = useMemo(
    () => results.issues.filter((i) => selectedIds.includes(i.issue_id)),
    [results.issues, selectedIds]
  );

  const onConfirm = () =>
    handleConfirm({
      results,
      selectedIssues: selectedIssues as IssueReward[],
      getAmount,
      clearAll,
      onDone: () => setOpen(false),
    });
  return (
    <>
      <AuroraBackground className="max-h-52 sm:rounded-3xl">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 max-h-52"
        >
          <div className="text-2xl md:text-6xl font-bold text-card-foreground/70 text-center flex flex-col md:flex-row items-center justify-center gap-2">
            {results.campaign_name}{" "}
            <span className="text-black/90 dark:text-white/90 mx-4 font-light">
              |
            </span>{" "}
            {results.project_name}
          </div>
        </motion.div>
      </AuroraBackground>

      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row w-full justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Contributor Pending Rewards</h1>
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground">
                Overview of merged issues and eligible contributors —
              </p>
              <Tooltip
                content={
                  <div className="min-w-[20rem] max-w-[24rem]">
                    <Alert
                      title="Validations:"
                      description={`- The issue must have its PR Merged\n- The issue must have the correct Campaign Label\n- The repository must be in the campaign\n- The contributor has primary wallet set`}
                      variant="info"
                      className="[&>div>p]:whitespace-pre-line"
                    />
                  </div>
                }
              >
                <span className="cursor-help font-semibold">
                  but which issues are included?
                </span>
              </Tooltip>{" "}
            </div>
          </div>

          <div className="flex flex-row my-4 gap-4 sm:gap-2 sm:h-11 items-center">
            <ShimmerButton className="shadow-2xl cursor-default bg-transparent border">
              <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-base dark:from-white dark:to-slate-900/10">
                Eligible Contributors: {results.total_eligible_contributors}
              </span>
            </ShimmerButton>

            <ShimmerButton className="shadow-2xl cursor-default bg-transparent border">
              <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-base dark:from-white dark:to-slate-900/10">
                Merged Issues: {results.total_issues}
              </span>
            </ShimmerButton>

            {selectedCount > 0 && (
              <RainbowButton
                onClick={() => setOpen(true)}
                variant="outline"
                className="hidden sm:block"
              >
                Reward Contributors
              </RainbowButton>
            )}
          </div>

          {selectedCount > 0 && (
            <RainbowButton
              onClick={() => setOpen(true)}
              variant="outline"
              className="block sm:hidden"
            >
              Reward Contributors
            </RainbowButton>
          )}
        </div>
      </div>

      <RewardSummaryDialog
        open={open}
        onOpenChange={setOpen}
        issues={selectedIssues}
        getAmount={getAmount}
        onConfirm={onConfirm}
        processing={isProcessing}
      />
    </>
  );
};
