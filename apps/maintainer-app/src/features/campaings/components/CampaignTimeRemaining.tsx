import { NumberTicker } from "@/components/ui/number-ticker";
import { useCampaingRemaining } from "@/hooks/UseCampaingRemaining";

interface CampaignTimeRemainingProps {
    startDate: string | undefined;
}

export default function CampaignTimeRemaining({ startDate }: CampaignTimeRemainingProps) {
  const { remaining } = useCampaingRemaining(startDate || "");

  return (
    <section className="w-auto py-32 gap-3 flex justify-start items-center">
      <h1 className="text-2xl font-bold md:text-4xl xl:text-6xl">Starts In:</h1>
      <div className="flex gap-1">
        <NumberTicker
          value={remaining.days}
          className="text-2xl tracking-tighter whitespace-pre-wrap text-black dark:text-white md:text-4xl xl:text-6xl"
        />
        <h3 className="text-2xl text-orange-500 md:text-4xl xl:text-6xl">Days</h3>
      </div>
      <div className="flex gap-1">
        <NumberTicker
          value={remaining.hours}
          className="text-2xl tracking-tighter whitespace-pre-wrap text-black dark:text-white md:text-4xl xl:text-6xl"
        />
        <h3 className="text-2xl text-orange-500 md:text-4xl xl:text-6xl">Hours</h3>
      </div>
    </section>
  );
}
