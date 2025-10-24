import { useCampaingRemaining } from "@/hooks/UseCampaingRemaining";

interface CampaignTimeRemainingProps {
  startDate: string | undefined;
  endDate: string | undefined;
}

export default function CampaignTimeRemaining({
  startDate,
  endDate,
}: CampaignTimeRemainingProps) {
  const { remaining, remainingEnds } = useCampaingRemaining(
    startDate || "",
    endDate || ""
  );

  const hasStarted =
    remaining.days <= 0 &&
    remaining.hours <= 0 &&
    remaining.minutes <= 0 &&
    remaining.seconds <= 0;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-secondary border border-border rounded-lg px-4 py-3 min-w-20 flex items-center justify-center">
        <span className="text-3xl font-semibold text-foreground tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-1">
          {hasStarted ? (
            <h1 className="text-6xl font-bold text-foreground">Ends In</h1>
          ) : (
            <h1 className="text-6xl font-bold text-foreground">Starts In</h1>
          )}
        </div>

        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
          {!hasStarted ? (
            <>
              <TimeUnit value={remaining.days} label="Days" />

              <TimeUnit value={remaining.hours} label="Hours" />

              <TimeUnit value={remaining.minutes} label="Minutes" />

              <TimeUnit value={remaining.seconds} label="Seconds" />
            </>
          ) : (
            <>
              <TimeUnit value={remainingEnds.days} label="Days" />
              <TimeUnit value={remainingEnds.hours} label="Hours" />
              <TimeUnit value={remainingEnds.minutes} label="Minutes" />
              <TimeUnit value={remainingEnds.seconds} label="Seconds" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
