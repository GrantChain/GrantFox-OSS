import { DollarSign, Landmark, Percent } from "lucide-react";
import {
  GetEscrowsFromIndexerResponse as Escrow,
  SingleReleaseEscrow,
  MultiReleaseEscrow,
} from "@trustless-work/escrow/types";

interface FinancialDetailsSectionProps {
  escrow: Escrow | null;
}

export const FinancialDetailsSection = ({
  escrow,
}: FinancialDetailsSectionProps) => {
  const getTotalAmount = () => {
    if (!escrow) return "0";
    if (escrow?.type === "single-release") {
      return (escrow as SingleReleaseEscrow).amount;
    }
    return (escrow as MultiReleaseEscrow).milestones.reduce(
      (sum, milestone) => sum + milestone.amount,
      0
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Landmark className="h-4 w-4 text-primary" />
        Financial Information
      </h3>

      <div className="grid gap-3 text-sm">
        <div className="flex items-start gap-3">
          <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Total Amount</p>
            <p className="text-muted-foreground text-xs">{getTotalAmount()}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Percent className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Platform Fee</p>
            <p className="text-muted-foreground text-xs">
              {escrow?.platformFee && Number(escrow.platformFee)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
