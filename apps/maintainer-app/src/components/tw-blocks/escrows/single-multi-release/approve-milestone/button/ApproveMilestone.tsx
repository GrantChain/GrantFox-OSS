import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEscrowsMutations } from "@/components/tw-blocks/tanstack/useEscrowsMutations";
import {
  ApproveMilestonePayload,
  MultiReleaseMilestone,
} from "@trustless-work/escrow/types";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { Loader2 } from "lucide-react";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";

type ApproveMilestoneButtonProps = {
  milestoneIndex: number | string;
  contractId: string;
  maintainerAddress: string;
};

export const ApproveMilestoneButton = ({
  milestoneIndex,
  contractId,
  maintainerAddress,
}: ApproveMilestoneButtonProps) => {
  const { approveMilestone } = useEscrowsMutations();
  const { selectedEscrow, updateEscrow } = useEscrowContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      setIsSubmitting(true);

      /**
       * Create the payload for the approve milestone mutation
       *
       * @param milestoneIndex - The index of the milestone to approve
       * @returns The payload for the approve milestone mutation
       */
      const payload: ApproveMilestonePayload = {
        contractId: contractId || "",
        milestoneIndex: String(milestoneIndex),
        approver: maintainerAddress || "",
      };

      /**
       * Call the approve milestone mutation
       *
       * @param payload - The payload for the approve milestone mutation
       * @param type - The type of the escrow
       * @param address - The address of the escrow
       */
      await approveMilestone.mutateAsync({
        payload,
        type: "multi-release",
        address: maintainerAddress || "",
      });

      toast.success("The Issue has been approved");

      updateEscrow({
        ...selectedEscrow,
        milestones: selectedEscrow?.milestones.map((milestone, index) => {
          if (index === Number(milestoneIndex)) {
            return {
              ...milestone,
              flags: {
                ...(milestone as MultiReleaseMilestone).flags,
                approved: true,
              },
            };
          }
          return milestone;
        }),
      });
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={isSubmitting}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Approving...</span>
        </div>
      ) : (
        "Approve"
      )}
    </Button>
  );
};
