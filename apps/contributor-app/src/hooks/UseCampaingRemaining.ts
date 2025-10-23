import { useEffect, useState } from "react";

export function useCampaingRemaining(startDate: string) {
  const [remaining, setRemaining] = useState<{ days: number; hours: number }>({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const computeRemaining = () => {
      const startRaw = startDate;
      if (!startRaw) {
        setRemaining({ days: 0, hours: 0 });
        return;
      }

      const start = new Date(String(startRaw));
      const now = new Date();
      const diffMs = start.getTime() - now.getTime();

      if (diffMs <= 0) {
        setRemaining({ days: 0, hours: 0 });
        return;
      }

      const dayMs = 24 * 60 * 60 * 1000;
      const hourMs = 60 * 60 * 1000;
      const days = Math.floor(diffMs / dayMs);
      const hours = Math.floor((diffMs % dayMs) / hourMs);
      setRemaining({ days, hours });
    };

    computeRemaining();
    const id = setInterval(computeRemaining, 60 * 1000);
    return () => clearInterval(id);
  }, [startDate]);

  return { remaining };
}
