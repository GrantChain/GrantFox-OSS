import { http } from "@/lib/api";
import { MaintainerPayload } from "@/types/maintainer.type";

export class MaintainerService {
  async addMaintainerToProject(projectId: string, payload: MaintainerPayload) {
    try {
      const { data } = await http.post(
        `/projects/${projectId}/maintainers`,
        payload
      );
      return data;
    } catch (error) {
      throw new Error("Failed to add maintainer to project", { cause: error });
    }
  }

  async removeMaintainerFromProject(projectId: string, maintainerId: string) {
    try {
      const { data } = await http.delete(
        `/projects/${projectId}/maintainers/${maintainerId}`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to remove maintainer from project", {
        cause: error,
      });
    }
  }

  async getMaintainersByProject(projectId: string) {
    try {
      const { data } = await http.get(
        `/project-maintainers/project/${projectId}/maintainers`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get maintainers by project", { cause: error });
    }
  }
}
