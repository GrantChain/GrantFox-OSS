import { NumberTicker } from "@/components/ui/number-ticker";
import { useCampaingRemaining } from "@/hooks/UseCampaingRemaining";

interface CampaignTimeRemainingProps {
  startDate: string | undefined;
}

export default function CampaignTimeRemaining({ startDate }: CampaignTimeRemainingProps) {
  const { remaining } = useCampaingRemaining(startDate || "");

  return (
    <section className="w-auto py-32 gap-3 flex justify-start items-center">
      <h1 className="text-6xl font-bold">Starts In:</h1>
      <div className="flex gap-1">
        <NumberTicker
          value={remaining.days}
          className="text-6xl tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        />
        <h3 className="text-6xl text-orange-500">Days</h3>
      </div>
      <div className="flex gap-1">
        <NumberTicker
          value={remaining.hours}
          className="text-6xl tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        />
        <h3 className="text-6xl text-orange-500">Hours</h3>
      </div>
    </section>
  );
}
