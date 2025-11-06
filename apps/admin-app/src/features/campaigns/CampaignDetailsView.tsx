"use client";

import { Card } from "@/components/ui/card";
import { useCampaignDetailsQuery } from "./hooks/useCampaignDetailsQuery";
import { FileIcon, Loader2 } from "lucide-react";
import { Details } from "./Details";

export const CampaignDetailsView = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useCampaignDetailsQuery(campaignId);

  return (
    <>
      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading data...</span>
        </Card>
      ) : data ? (
        <Details data={data} />
      ) : (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">No data found</span>
        </Card>
      )}
    </>
  );
};
