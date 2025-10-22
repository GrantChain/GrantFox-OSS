import { Maintainers } from "../maintainers/Maintainers";
import {
  RegisteredRepositories,
  Repositories,
} from "../repositories/Repositories";

export const getProjectTabs = (
  orgLogin?: string,
  projectId?: string,
  projectStatus?: string
) => [
  {
    name: "All Repositories",
    value: "repositories",
    content: (
      <>
        {projectId ? (
          <Repositories orgLogin={orgLogin} projectId={projectId} />
        ) : null}
      </>
    ),
  },
  {
    name: "Repositories Registered",
    value: "repositories-registered",
    content: (
      <>
        {projectId ? (
          <RegisteredRepositories
            projectId={projectId}
            projectStatus={projectStatus}
          />
        ) : null}
      </>
    ),
  },
  {
    name: "Maintainers",
    value: "maintainers",
    content: (
      <>
        <Maintainers />
      </>
    ),
  },
];
