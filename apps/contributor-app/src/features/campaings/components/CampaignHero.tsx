import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign.type";
import { ApiUser } from "@/types/user.type";
import { useCampaignsMutations } from "../hooks/useCampaignMutation";
import { Card } from "@/components/ui/card";

interface CampaignHeroProps {
  activeCampaign: Campaign | null;
  contributorsCount: number;
  contributors?: ApiUser[];
}

export default function CampaignHero({
  activeCampaign,
  contributorsCount,
  contributors,
}: CampaignHeroProps) {
  const { user } = useUser();
  const { registerContributor } = useCampaignsMutations();
  const isRegistered = Boolean(
    contributors?.some((c) => c.user_id === user?.id)
  );

  return (
    <>
      <Card className="relative p-4">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] hidden sm:block"
          )}
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
        <div className="w-full flex justify-between items-center">
          <p className="w-lg text-balance text-muted-foreground text-xl">
            {activeCampaign?.description ?? ""}
          </p>
          <div className="w-full hidden sm:flex justify-end items-center gap-5 ">
            <div className="p-2 flex flex-col justify-center items-center">
              <NumberTicker
                value={activeCampaign?.repositories.length || 0}
                className="text-5xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-2xl font-medium block bg-clip-text">
                Repositories
              </span>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <NumberTicker
                value={contributorsCount}
                className="text-5xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-2xl font-medium block bg-clip-text">
                Contributors
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4 block sm:hidden">
          <div className="p-2 flex flex-col justify-center items-center">
            <NumberTicker
              value={activeCampaign?.repositories.length || 0}
              className="text-5xl font-bold tracking-tighter whitespace-pre-wrap"
            />
            <span className="text-2xl font-medium block bg-clip-text">
              Repositories
            </span>
          </div>
        </Card>

        <Card className="p-4 block sm:hidden">
          <div className="p-2 flex flex-col justify-center items-center">
            <NumberTicker
              value={contributorsCount}
              className="text-5xl font-bold tracking-tighter whitespace-pre-wrap"
            />
            <span className="text-2xl font-medium block bg-clip-text">
              Contributors
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
