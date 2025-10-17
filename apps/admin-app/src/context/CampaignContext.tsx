"use client";

import { Campaign } from "@/types/campaign.type";
import { createContext, useContext, useMemo, useState } from "react";

export type CampaignContextType = {
  campaign: Campaign | null;
  setCampaign: (campaign: Campaign | null) => void;

  openDetails: boolean;
  setOpenDetails: (open: boolean) => void;

  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;

  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
};

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

export function useCampaignContext(): CampaignContextType {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error(
      "useCampaignContext must be used within a CampaignProvider"
    );
  }

  return context;
}

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const value = useMemo(
    () => ({
      campaign,
      setCampaign,
      openDetails,
      setOpenDetails,
      openEdit,
      setOpenEdit,
      openDelete,
      setOpenDelete,
    }),
    [campaign, openDetails, openEdit, openDelete]
  );

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}
