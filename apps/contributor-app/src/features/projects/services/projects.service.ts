import { Project } from "@/types/project.type";
import { AxiosInstance } from "axios";

export class ProjectsService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getAllApprovedProjects(): Promise<Project[]> {
    try {
      const { data } = await this.http.get("/projects?status=APPROVED");
      return data;
    } catch (error) {
      throw new Error("Failed to get all approved projects", { cause: error });
    }
  }
}
