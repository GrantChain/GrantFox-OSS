import { ProjectRewardsTable } from "./ProjectRewardsTable";

export const ProjectRewardsView = ({ projectId }: { projectId: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <ProjectRewardsTable projectId={projectId} />
    </div>
  );
};
