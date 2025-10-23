import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign.type";
import { useCampaignsMutations } from "../hooks/useCampaignMutation";

interface CampaignHeroProps {
  activeCampaign: Campaign | null;
  contributorsCount: number;
}

export default function CampaignHero({ activeCampaign, contributorsCount }: CampaignHeroProps) {
  const { user } = useUser()
  const { registerContributor } = useCampaignsMutations();

  return (
    <section className="relative flex flex-col gap-28 rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-gray-500"
      />
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">{activeCampaign?.name}</h1>
        <PulsatingButton onClick={() => registerContributor({ campaignId: activeCampaign?.campaign_id!, userId: user!.id })}>Register</PulsatingButton>
      </div>
      <div className="w-full flex justify-between items-center">
        <TextAnimate animation="blurIn" as="span" className="w-lg">
          {activeCampaign?.description ?? ""}
        </TextAnimate>
        <div className="w-full flex justify-end items-center gap-5">
          <div className="p-2 flex flex-col justify-center items-center">
            <NumberTicker
              value={activeCampaign?.repositories.length || 0}
              className="text-3xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white xl:text-5xl"
            />
            <span className="text-xl font-medium block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300 xl:text-2xl">
              Repositories
            </span>
          </div>
          <div className="p-2 flex flex-col justify-center items-center">
            <NumberTicker
              value={contributorsCount}
              className="text-3xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white xl:text-5xl"
            />
            <span className="text-xl font-medium block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300 xl:text-2xl">
              Contributors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
