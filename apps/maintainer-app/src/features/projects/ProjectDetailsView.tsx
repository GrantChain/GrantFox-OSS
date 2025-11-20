"use client";

import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { getProjectTabs } from "./tabs.constant";
import { useCampaignContext } from "@/context/CampaignContext";
import { useEscrowExists } from "@/features/escrows/hooks/useEscrowExists";
import { useProjectWithOrg } from "./hooks/useProjectWithOrg";
import { GeneralInfoCard } from "./components/GeneralInfoCard";
import { PendingRewardsBanner } from "./components/PendingRewardsBanner";
import { ProjectTabs, type TabDef } from "./components/ProjectTabs";

export const ProjectDetailsView = ({ projectId }: { projectId: string }) => {
  const { finishedCampaign } = useCampaignContext();

  const { data: escrowExists } = useEscrowExists({
    campaignId: finishedCampaign?.campaign_id,
    projectId,
    enabled: Boolean(finishedCampaign?.campaign_id && projectId),
  });

  const {
    project,
    organizationData,
    isLoading,
    isProjectNotFound,
    isOrgNotFound,
    hasOrgHandle,
  } = useProjectWithOrg(projectId);

  if (isLoading) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <Loader2 className="size-10 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </Card>
    );
  }

  if (isProjectNotFound) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">No project found</span>
      </Card>
    );
  }

  if (hasOrgHandle && isOrgNotFound) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">
          Organization not found
        </span>
      </Card>
    );
  }

  if (!organizationData) {
    return null;
  }
  const tabs = getProjectTabs(project?.github_handle ?? undefined, projectId);

  return (
    <div className="min-h-screen bg-background px-4 md:px-8">
      <GeneralInfoCard
        organization={organizationData}
        projectStatus={project?.status}
      />

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Stats & Networks */}
        <div>
          {!escrowExists && finishedCampaign && (
            <PendingRewardsBanner
              campaignName={finishedCampaign.name}
              campaignId={finishedCampaign.campaign_id}
              projectId={projectId}
            />
          )}
        </div>

        {/* Right Column - Tabs */}
        <div className="w-full">
          <ProjectTabs tabs={tabs as unknown as TabDef[]} />
        </div>
      </div>
    </div>
  );
};
