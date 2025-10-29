import { useEffect, useState } from "react";

export function useCampaingRemaining(startDate: string, endDate: string) {
  const [remaining, setRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [remainingEnds, setRemainingEnds] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const computeRemainingEnds = () => {
      const endRaw = endDate;
      if (!endRaw) {
        setRemainingEnds({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const end = new Date(String(endRaw));
      const now = new Date();
      const diffMs = end.getTime() - now.getTime();

      if (diffMs <= 0) {
        setRemainingEnds({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const dayMs = 24 * 60 * 60 * 1000;
      const hourMs = 60 * 60 * 1000;
      const minuteMs = 60 * 1000;
      const secondMs = 1000;
      const days = Math.floor(diffMs / dayMs);
      const hours = Math.floor((diffMs % dayMs) / hourMs);
      const minutes = Math.floor((diffMs % hourMs) / minuteMs);
      const seconds = Math.floor((diffMs % minuteMs) / secondMs);
      setRemainingEnds({ days, hours, minutes, seconds });
    };

    computeRemainingEnds();
    const id = setInterval(computeRemainingEnds, 60);
    return () => clearInterval(id);
  }, [endDate]);

  useEffect(() => {
    const computeRemaining = () => {
      const startRaw = startDate;
      if (!startRaw) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const start = new Date(String(startRaw));
      const now = new Date();
      const diffMs = start.getTime() - now.getTime();

      if (diffMs <= 0) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const dayMs = 24 * 60 * 60 * 1000;
      const hourMs = 60 * 60 * 1000;
      const minuteMs = 60 * 1000;
      const secondMs = 1000;
      const days = Math.floor(diffMs / dayMs);
      const hours = Math.floor((diffMs % dayMs) / hourMs);
      const minutes = Math.floor((diffMs % hourMs) / minuteMs);
      const seconds = Math.floor((diffMs % minuteMs) / secondMs);
      setRemaining({ days, hours, minutes, seconds });
    };

    computeRemaining();
    const id = setInterval(computeRemaining, 60);
    return () => clearInterval(id);
  }, [startDate]);

  return { remaining, remainingEnds };
}
