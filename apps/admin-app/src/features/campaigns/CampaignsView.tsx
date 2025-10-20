"use client";

import { Card } from "@/components/ui/card";
import { CampaignCard } from "./CampaignCard";
import { Hero } from "./Hero";
import { useCampaignsQuery } from "./hooks/useCampaignsQuery";
import { CampaignSheetForm } from "@/features/campaigns/CampaignSheetForm";
import { Loader2 } from "lucide-react";

export const CampaignsView = () => {
  const { data: campaigns, isLoading } = useCampaignsQuery();

  return (
    <>
      <Hero />

      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Featured Campaigns</h2>
          <p className="text-muted-foreground">
            Manage your campaigns to the OSS community
          </p>
        </div>
        <CampaignSheetForm />
      </div>

      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading campaigns...
          </span>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {campaigns?.map((campaign) => (
            <CampaignCard key={campaign.campaign_id} campaign={campaign} />
          ))}
        </div>
      )}
    </>
  );
};
