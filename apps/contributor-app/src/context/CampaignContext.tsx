"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Campaign } from "@/types/campaign.type";
import { CampaignService } from "@/features/campaings/services/campaign.service";
import { http } from "@/lib/api";

interface CampaignContextValue {
  activeCampaign: Campaign | null;
  upcomingCampaign: Campaign | null;
  campaigns: Campaign[];
  isLoading: boolean;
  refreshActiveCampaign: () => Promise<void>;
}

const CampaignContext = createContext<CampaignContextValue | undefined>(
  undefined
);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const service = useMemo(() => new CampaignService(http), []);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [upcomingCampaign, setUpcomingCampaign] = useState<Campaign | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const loadingRef = useRef<boolean>(false);
  const firstLoadRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshActiveCampaign = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      if (firstLoadRef.current) {
        setIsLoading(true);
      }
      const activeList = await service.getActiveCampaign();
      const active =
        Array.isArray(activeList) && activeList.length > 0
          ? activeList[0]
          : null;
      setActiveCampaign(active);

      const all = await service.getAllCampaigns();
      setCampaigns(all ?? []);
      const upcoming = (all ?? []).find((c) => {
        const st = (c.status ?? "").toUpperCase();
        return st === "UPCOMMING" || st === "UPCOMING";
      });
      setUpcomingCampaign(upcoming ?? null);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      if (firstLoadRef.current) {
        setIsLoading(false);
        firstLoadRef.current = false;
      }
    }
  }, [service]);

  useEffect(() => {
    refreshActiveCampaign();
    const interval = setInterval(
      () => {
        refreshActiveCampaign();
      },
      1000 * 60 * 5
    );
    return () => clearInterval(interval);
  }, [refreshActiveCampaign]);

  useEffect(() => {
    const onFocus = () => refreshActiveCampaign();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refreshActiveCampaign]);

  const value = useMemo<CampaignContextValue>(
    () => ({
      activeCampaign,
      upcomingCampaign,
      campaigns,
      isLoading,
      refreshActiveCampaign,
    }),
    [
      activeCampaign,
      upcomingCampaign,
      campaigns,
      isLoading,
      refreshActiveCampaign,
    ]
  );

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaignContext(): CampaignContextValue {
  const ctx = useContext(CampaignContext);
  if (!ctx)
    throw new Error("useCampaignContext must be used within CampaignProvider");
  return ctx;
}
