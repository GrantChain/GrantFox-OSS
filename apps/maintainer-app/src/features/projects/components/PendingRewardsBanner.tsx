import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function PendingRewardsBanner({
  campaignName,
  campaignId,
  projectId,
}: {
  campaignName?: string;
  campaignId?: string;
  projectId: string;
}) {
  if (!campaignId) return null;

  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm px-6 py-4 bg-white dark:bg-zinc-900">
      <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
        <Info className="w-5 h-5" /> Pending Rewards
      </h3>

      {campaignName ? (
        <span className="text-sm text-muted-foreground font-semibold text-center block my-2">
          {campaignName}
        </span>
      ) : null}

      <p className="text-sm text-neutral-600 dark:text-neutral-400 my-6">
        Distribute rewards to contributors who participated in your project during
        the last completed campaign.
      </p>

      <Link
        href={`/maintainer/financial/contributors-pending-rewards?campaignId=${campaignId}&projectId=${projectId}`}
      >
        <Button variant="outline" className="w-full cursor-pointer">
          Send Rewards
        </Button>
      </Link>
    </BackgroundGradient>
  );
}


