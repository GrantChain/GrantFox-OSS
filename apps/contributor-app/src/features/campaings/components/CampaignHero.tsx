import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign.type";
import { ApiUser } from "@/types/user.type";
import { useCampaignsMutations } from "../hooks/useCampaignMutation";
import { Card } from "@/components/ui/card";
import { AvatarCircles } from "@/components/ui/avatar-circles";

interface CampaignHeroProps {
  activeCampaign: Campaign | null;
  contributorsCount: number;
  contributors?: ApiUser[];
}

export const CampaignHero = ({
  activeCampaign,
  contributorsCount,
  contributors,
}: CampaignHeroProps) => {
  const { user } = useUser();
  const { registerContributor } = useCampaignsMutations();
  const isRegistered = Boolean(
    contributors?.some((c) => c.user_id === user?.id)
  );

  const topCount = Math.min(contributors?.length ?? 0, 10);
  const avatarUrls = (contributors ?? []).slice(0, topCount).map((c) => ({
    imageUrl: c.avatar_url ?? "",
    profileUrl: `https://github.com/${c.username}`,
  }));

  const remaining = Math.max((contributors ?? []).length - topCount, 0);

  return (
    <>
      <Card className="relative p-8">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] hidden sm:block"
          )}
          opacity={0.3}
          width={20}
          height={20}
          squares={[80, 80]}
          squaresClassName="hover:fill-gray-500"
        />
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold">{activeCampaign?.name}</h1>
          {!isRegistered && (
            <PulsatingButton
              onClick={() =>
                registerContributor({
                  campaignId: activeCampaign?.campaign_id ?? "",
                  userId: user?.id ?? "",
                })
              }
            >
              Register
            </PulsatingButton>
          )}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-center gap-4">
          <p className="w-full sm:w-7/12 text-balance text-muted-foreground text-xl">
            {activeCampaign?.description ?? ""}
          </p>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Contributors</h3>

            <AvatarCircles numPeople={remaining} avatarUrls={avatarUrls} />
          </div>
        </div>
      </Card>
    </>
  );
};
