"use client";

import { useLayoutEffect, useMemo } from "react";
import { FinishedCampaignResults } from "@/types/campaign.type";
import { ContributorPendingHeader } from "./components/ContributorPendingHeader";
import { IssuesManager } from "./components/IssuesManager";
import { RewardSelectionProvider } from "./context/RewardSelectionContext";
import { useEscrowExists } from "@/features/escrows/hooks/useEscrowExists";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { CampaignService } from "../campaings/services/campaign.service";
import { http } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const ContributorPendingRewardsView = ({
  campaignId,
  projectId,
}: {
  campaignId: string;
  projectId: string;
}) => {
  const router = useRouter();

  const {
    data: escrowExists,
    isLoading: escrowLoading,
    isFetching: escrowFetching,
  } = useEscrowExists({
    campaignId,
    projectId,
    enabled: Boolean(campaignId && projectId),
  });

  useLayoutEffect(() => {
    if (escrowExists) {
      router.replace(`/maintainer/projects/${projectId}`);
    }
  }, [escrowExists, router, projectId]);

  if (!campaignId || !projectId) return null;
  if (escrowLoading || escrowFetching) return null;

  if (escrowExists) {
    return null;
  }

  // const service = useMemo(() => new CampaignService(http), []);

  // const {
  //   data: results,
  //   isLoading,
  //   isFetching,
  //   isError,
  //   error,
  // } = useQuery<FinishedCampaignResults>({
  //   queryKey: ["finished-campaign-results", campaignId, projectId],
  //   enabled: Boolean(campaignId && projectId),
  //   queryFn: () =>
  //     service.getMergedIssuesInFinishedCampaign(campaignId, projectId),
  //   staleTime: 1000 * 60 * 5,
  // });

  // Mocked to testing purposes
  const results = {
    campaign_id: "2e7d104c-d789-4be1-a0c7-83fbcccea4a4",
    campaign_name: "Campaign-Test",
    project_id: "0a0a0f93-8656-45a3-93b9-b660fc363978",
    project_name: "GrantFox-OSS",
    total_issues: 10,
    total_eligible_contributors: 7,
    issues: [
      // Good PR
      {
        issue_id: 1,
        issue_number: 1115,
        title: "Fix broken navigation links",
        html_url: "https://github.com/GrantChain/GrantFox/issues/115",
        labels: ["bug", "frontend", "Campaign-Test"],
        repository: {
          name: "ui",
          github_url: "https://github.com/GrantChain/GrantFox",
        },
        pull_request: {
          pr_number: 120,
          pr_url: "https://github.com/GrantChain/GrantFox/pull/125",
          merged_at: "2025-01-03T12:30:00Z",
          author_github_username: "JoelVR17",
        },
        contributor_exists: true,
        contributor_info: {
          user_id: "ca9ea35a-da0e-4045-8ff7-bd3059b2e985",
          username: "JoelVR17",
          email: "vermudo.com@gmail.com",
          has_contributor_role: true,
          primary_wallet:
            "GDSU26P6L2DDRIKZOU2WKLDJASMZL5ULDPVPFVDRNF2SUGPP4K2IVFJS",
        },
        amount: 0,
      },
      // Good PR
      {
        issue_id: 2,
        issue_number: 1115,
        title: "Fix broken navigation links",
        html_url: "https://github.com/GrantChain/GrantFox/issues/115",
        labels: ["bug", "frontend", "Campaign-Test"],
        repository: {
          name: "ui",
          github_url: "https://github.com/GrantChain/GrantFox",
        },
        pull_request: {
          pr_number: 120,
          pr_url: "https://github.com/GrantChain/GrantFox/pull/125",
          merged_at: "2025-01-03T12:30:00Z",
          author_github_username: "JoelVR17",
        },
        contributor_exists: true,
        contributor_info: {
          user_id: "ca9ea35a-da0e-4045-8ff7-bd3059b2e985",
          username: "JoelVR17",
          email: "vermudo.com@gmail.com",
          has_contributor_role: true,
          primary_wallet:
            "GDSU26P6L2DDRIKZOU2WKLDJASMZL5ULDPVPFVDRNF2SUGPP4K2IVFJS",
        },
        amount: 0,
      },
      // Without primary wallet
      {
        issue_id: 3,
        issue_number: 115,
        title: "Optimize image loading speed",
        html_url: "https://github.com/GrantChain/GrantFox/issues/115",
        labels: ["performance", "Campaign-Test"],
        repository: {
          name: "api",
          github_url: "https://github.com/GrantChain/GrantFox",
        },
        pull_request: {
          pr_number: 44,
          pr_url: "https://github.com/acme/api/pull/44",
          merged_at: "2025-02-10T09:00:00Z",
          author_github_username: "speedRacer",
        },
        contributor_exists: true,
        contributor_info: {
          user_id: "ca9ea35a-da0e-4045-8ff7-bd3059b2e985",
          username: "racer",
          email: "racer@example.com",
          has_contributor_role: false,
          primary_wallet: null,
        },
        amount: 0,
      },
      // Without contributor
      {
        issue_id: 4,
        issue_number: 115,
        title: "Add unit tests for authentication",
        html_url: "https://github.com/GrantChain/GrantFox/issues/115",
        labels: ["tests", "backend", "Campaign-Test"],
        repository: {
          name: "auth",
          github_url: "https://github.com/GrantChain/GrantFox",
        },
        pull_request: {
          pr_number: 150,
          pr_url: "https://github.com/acme/auth/pull/150",
          merged_at: "2025-03-01T17:45:00Z",
          author_github_username: "qaEngineer",
        },
        contributor_exists: false,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      {/* {isLoading || isFetching ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading results...
          </span>
        </Card>
      ) : isError ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            {(error as unknown as Error)?.message ?? "Failed to load results"}
          </span>
        </Card>
      ) : results ? ( */}
      <RewardSelectionProvider limit={10}>
        <div className="flex flex-col gap-10">
          <ContributorPendingHeader results={results} />

          <IssuesManager
            issues={results.issues}
            onAmountUpdate={(issueId, amount) => {
              try {
                void issueId;
                void amount;
              } catch {
                // ignore
              }
            }}
          />
        </div>
      </RewardSelectionProvider>
      {/* ) : (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">
            No results found
          </span>
        </Card>
      )} */}
    </div>
  );
};
