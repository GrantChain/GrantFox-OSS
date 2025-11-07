"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, Loader2 } from "lucide-react";
import { DashboardCharts } from "./DashboardChart";
import { useCampaignDetailsQuery } from "../campaigns/hooks/useCampaignDetailsQuery";
import { useCampaignContext } from "@/context/CampaignContext";

export const DashboardView = () => {
  const { activeCampaign } = useCampaignContext();
  const { data, isLoading } = useCampaignDetailsQuery(
    activeCampaign?.campaign_id
  );

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            View the dashboard to see the projects and campaigns.
          </p>
        </div>
        <div />
      </div>

      {isLoading ? (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <Loader2 className="size-10 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading data...</span>
        </Card>
      ) : data ? (
        <Tabs defaultValue="activeCampaign" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="activeCampaign">Active Campaign</TabsTrigger>
            {/* <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="maintainers">Maintainers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger> */}
          </TabsList>

          <TabsContent value="activeCampaign">
            <DashboardCharts data={data} />
          </TabsContent>

          {/* <TabsContent value="general">
            <Card className="p-4">General</Card>
          </TabsContent>

          <TabsContent value="contributors">
            <Card className="p-4">Contributors</Card>
          </TabsContent>

          <TabsContent value="maintainers">
            <Card className="p-4">Maintainers</Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-4">Projects</Card>
          </TabsContent> */}
        </Tabs>
      ) : (
        <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
          <FileIcon className="size-10" />
          <span className="text-sm text-muted-foreground">No data found</span>
        </Card>
      )}
    </>
  );
};
