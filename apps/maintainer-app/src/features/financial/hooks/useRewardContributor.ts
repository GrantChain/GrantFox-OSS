import { useUser } from "@/context/UserContext";
import { useBuild } from "@/components/tw-blocks/helpers/build-escrow.helper";
import { toast } from "sonner";
import type { FinishedCampaignResults } from "@/types/campaign.type";
import type { IssueReward } from "@/types/issue.type";
import {
  EscrowType,
  InitializeMultiReleaseEscrowResponse,
} from "@trustless-work/escrow";
import { useEscrowsMutations } from "@/components/tw-blocks/tanstack/useEscrowsMutations";
import { useMemo } from "react";
import { http } from "@/lib/api";
import { EscrowsService } from "@/features/escrows/services/escrows.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCampaignContext } from "@/context/CampaignContext";
import type { CreateEscrowPayload } from "@/types/escrow.type";
import { UserRole } from "@/types/user.type";
import { useRouter } from "next/navigation";

type HandleConfirmArgs = {
  results: FinishedCampaignResults;
  selectedIssues: IssueReward[];
  getAmount: (issueId: number) => number | undefined;
  clearAll: () => void;
  onDone?: () => void;
};

export function useRewardContributor() {
  const { hasMaintainerRole, maintainerPrimaryWallet } = useUser();
  const { deployEscrow } = useEscrowsMutations();
  const { buildEscrow } = useBuild();
  const { finishedCampaign } = useCampaignContext();
  const escrowsService = useMemo(() => new EscrowsService(http), []);
  const queryClient = useQueryClient();
  const router = useRouter();

  const createEscrow = useMutation({
    mutationFn: (payload: CreateEscrowPayload) =>
      escrowsService.createEscrow(payload),
    onSuccess: async () => {
      toast.success(
        "The request reward was sent to the GrantFox team. You'll be notified when the funding is completed.",
        {
          duration: 10000,
        }
      );
      await queryClient.invalidateQueries({ queryKey: ["escrows"] });
    },
    onError: () => {
      toast.error(
        "The escrow is in the blockchain, but we couldn't save it in the database. Please contact support."
      );
    },
  });

  const handleConfirm = async ({
    results,
    selectedIssues,
    getAmount,
    clearAll,
    onDone,
  }: HandleConfirmArgs) => {
    try {
      if (selectedIssues.length === 0) {
        toast.error("No issues selected to reward");
        return;
      }

      if (!hasMaintainerRole) {
        toast.error("Current user must have MAINTAINER role");
        return;
      }

      const maintainerWalletAddress =
        (maintainerPrimaryWallet as Record<string, unknown> | null)?.[
          "primary_wallet"
        ] ??
        (maintainerPrimaryWallet as Record<string, unknown> | null)?.[
          "primaryWallet"
        ];

      if (
        typeof maintainerWalletAddress !== "string" ||
        !maintainerWalletAddress
      ) {
        toast.error("Set a primary maintainer wallet before rewarding");
        return;
      }

      const preparedIssues: IssueReward[] = selectedIssues.map((issue) => ({
        ...issue,
        amount: getAmount(issue.issue_id) ?? 0,
      }));

      const invalidIssues = preparedIssues
        .filter((i) => !i.contributor_info?.primary_wallet)
        .map((i) => `#${i.issue_number}`);

      if (invalidIssues.length > 0) {
        toast.error(
          `Missing contributor wallet for: ${invalidIssues.join(", ")}`
        );
        return;
      }

      const escrow = buildEscrow(
        preparedIssues,
        maintainerWalletAddress,
        results.project_name
      );

      if (!escrow) {
        toast.error("No escrow to initialize. Please try again.");
        return;
      }

      if (!escrow?.milestones || escrow.milestones.length === 0) {
        toast.error("No valid milestones to initialize");
        return;
      }

      // Trustless Work - Stellar Blockchain
      const response: InitializeMultiReleaseEscrowResponse =
        (await deployEscrow.mutateAsync({
          payload: escrow,
          type: "multi-release" as EscrowType,
          address: maintainerWalletAddress || "",
        })) as InitializeMultiReleaseEscrowResponse;

      if (!response?.contractId) {
        toast.error("Missing contractId from escrow initialization");
        return;
      }

      if (!finishedCampaign?.campaign_id) {
        toast.error("Missing campaign id");
        return;
      }

      if (!results.project_id) {
        toast.error("Missing project id");
        return;
      }

      // Persist in DB
      const dbResponse = await createEscrow.mutateAsync({
        escrow_id: response.contractId,
        escrow_type: UserRole.CONTRIBUTOR,
        campaign_id: finishedCampaign.campaign_id,
        project_id: results.project_id,
      });

      if (!dbResponse?.escrow_id) {
        toast.error(
          "The escrow is in the blockchain, but we couldn't save it in the database. Please contact support."
        );
        return;
      }

      router.replace(`/maintainer/projects/${results.project_id}`);

      queryClient.invalidateQueries({
        queryKey: ["escrows", "project", results.project_id],
      });

      clearAll();
      onDone?.();
    } catch {
      console.error("Failed to reward contributor");
    }
  };

  const isProcessing = deployEscrow.isPending || createEscrow.isPending;

  return { handleConfirm, isProcessing };
}
