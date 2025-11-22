import { ProjectRewardsView } from "../financial/ProjectRewardsView";
import { Maintainers } from "../maintainers/Maintainers";
import { RepositoriesCombined } from "../repositories/RepositoriesCombined";
import { FolderGit2, Users, Wallet } from "lucide-react";

export const getProjectTabs = (orgLogin?: string, projectId?: string) => [
  {
    name: (
      <div className="flex items-center gap-2">
        <FolderGit2 className="size-4" />
        <span>Repositories</span>
      </div>
    ),
    value: "repositories",
    content: (
      <>
        {projectId ? (
          <RepositoriesCombined orgLogin={orgLogin} projectId={projectId} />
        ) : null}
      </>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2">
        <Wallet className="size-4" />
        <span>Financial</span>
      </div>
    ),
    value: "financial",
    content: (
      <>{projectId ? <ProjectRewardsView projectId={projectId} /> : null}</>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2">
        <Users className="size-4" />
        <span>Maintainers</span>
      </div>
    ),
    value: "maintainers",
    content: <>{projectId ? <Maintainers projectId={projectId} /> : null}</>,
  },
];
