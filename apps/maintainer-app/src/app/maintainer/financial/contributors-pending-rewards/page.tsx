import { ContributorPendingRewardsView } from "@/features/financial/ContributorPendingRewardsView";
import { redirect } from "next/navigation";

export default function ContributorsPendingRewardsPage({
  searchParams,
}: {
  searchParams: { campaignId?: string; projectId?: string };
}) {
  const campaignId = searchParams?.campaignId ?? "";
  const projectId = searchParams?.projectId ?? "";

  if (!campaignId || !projectId) {
    redirect("/maintainer/financial");
  }

  return (
    <ContributorPendingRewardsView
      campaignId={campaignId}
      projectId={projectId}
    />
  );
}
