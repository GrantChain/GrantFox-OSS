import { Project, ProjectStatus } from "@/types/project.type";
import { Review, ReviewPayload } from "@/types/review.type";
import { AxiosInstance } from "axios";

export class ProjectService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getProjects({
    status,
  }: {
    status?: ProjectStatus;
  }): Promise<Project[]> {
    try {
      const params = typeof status === "undefined" ? undefined : { status };
      const { data } = await this.http.get("/projects", { params });
      return data;
    } catch (error) {
      throw new Error("Failed to get projects", { cause: error });
    }
  }

  async createReview(projectId: string, review: ReviewPayload) {
    try {
      const { data } = await this.http.post(
        `/project-reviews/project/${projectId}`,
        review
      );
      return data;
    } catch (error) {
      throw new Error("Failed to create review", { cause: error });
    }
  }

  async getAllReviewsByProject(projectId: string): Promise<Review[]> {
    try {
      const { data } = await this.http.get(
        `/project-reviews/project/${projectId}`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get all reviews by project", { cause: error });
    }
  }
}
