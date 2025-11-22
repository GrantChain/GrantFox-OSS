import { useCampaignContext } from "@/context/CampaignContext";
import { IssueReward } from "@/types/issue.type";
import { InitializeMultiReleaseEscrowPayload } from "@trustless-work/escrow";
import { trustlines } from "../wallet-kit/trustlines";

export const useBuild = () => {
  const { finishedCampaign } = useCampaignContext();

  function buildEscrow(
    issues: IssueReward[],
    maintainerWallet: string,
    projectName: string
  ): InitializeMultiReleaseEscrowPayload {
    const escrow: InitializeMultiReleaseEscrowPayload = {
      signer: maintainerWallet,

      // CAMPAIGN_NAME - PROJECT_NAME
      engagementId: process.env.NEXT_PUBLIC_ENGAGEMENT || "No set",

      // CAMPAIGN_NAME - PROJECT_NAME
      title: finishedCampaign?.name + " - " + projectName || "No set",

      // Reward distribution to contributors of PROJECT_NAME for the CAMPAIGN_NAME campaign
      description: `Reward distribution to contributors of ${projectName} for ${finishedCampaign?.name}`,

      roles: {
        approver: maintainerWallet,
        serviceProvider: maintainerWallet,
        platformAddress: process.env.NEXT_PUBLIC_GRANTFOX_WALLET || "",
        releaseSigner: process.env.NEXT_PUBLIC_GRANTFOX_WALLET || "",
        disputeResolver: process.env.NEXT_PUBLIC_GRANTFOX_WALLET || "",
      },

      platformFee: Number(process.env.NEXT_PUBLIC_PLATFORM_FEE) || 0,

      trustline: {
        address:
          trustlines.find(
            (trustline) =>
              trustline.name === "USDC" && trustline.network === "testnet"
          )?.address || "",
      },

      milestones: issues.map((issue) => ({
        // ISSUE_TITLE & REPOSITORY_NAME & ISSUE_LINK & PR_LINK
        description:
          issue.title +
          "&" +
          issue.repository.name +
          "&" +
          issue.html_url +
          "&" +
          issue.pull_request.pr_url,
        amount: issue.amount || 0,
        receiver: issue.contributor_info?.primary_wallet || "",
      })),
    };

    return escrow;
  }

  return { buildEscrow };
};
