import { Project, ProjectPayload } from "@/types/project.type";
import { AxiosInstance } from "axios";

export class ProjectsService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    try {
      const { data } = await this.http.get(`/projects/user/${userId}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get projects by user", { cause: error });
    }
  }

  async getProject(projectId: string): Promise<Project> {
    try {
      const { data } = await this.http.get(`/projects/${projectId}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get project", { cause: error });
    }
  }

  async createProject(project: ProjectPayload): Promise<Project> {
    try {
      const { data } = await this.http.post("/projects", project);
      return data;
    } catch (error) {
      throw new Error("Failed to create project", { cause: error });
    }
  }

  async addMaintainerToProject(
    projectId: string,
    maintainerId: string
  ): Promise<Project> {
    try {
      const { data } = await this.http.post(
        `/projects/${projectId}/maintainers`,
        { maintainerId, is_owner: false }
      );
      return data;
    } catch (error) {
      throw new Error("Failed to add maintainer to project", { cause: error });
    }
  }

  async transferOwnership(
    projectId: string,
    newOwnerId: string
  ): Promise<Project> {
    try {
      const { data } = await this.http.post(
        `/project-maintainers/project/${projectId}/transfer-ownership`,
        { new_owner_id: newOwnerId }
      );
      return data;
    } catch (error) {
      throw new Error("Failed to transfer ownership of project", {
        cause: error,
      });
    }
  }
}
