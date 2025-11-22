import {
  ApiEscrow,
  CheckIfEscrowExistsResponse,
  CreateEscrowPayload,
} from "@/types/escrow.type";
import { AxiosInstance } from "axios";

export class EscrowsService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async createEscrow(payload: CreateEscrowPayload): Promise<ApiEscrow> {
    try {
      const { data } = await this.http.post("/escrows", payload);
      return data;
    } catch (error) {
      throw new Error("Failed to create escrow", { cause: error });
    }
  }

  async checkIfEscrowExists({
    campaign_id,
    project_id,
  }: {
    campaign_id: string;
    project_id: string;
  }): Promise<CheckIfEscrowExistsResponse> {
    try {
      const { data } = await this.http.get(`/escrows/check`, {
        params: { campaign_id, project_id },
      });
      return data;
    } catch (error) {
      throw new Error("Failed to check if escrow exists", { cause: error });
    }
  }

  async getEscrowsByProject(projectId: string): Promise<ApiEscrow[]> {
    try {
      const { data } = await this.http.get(`/escrows/project/${projectId}`);
      return data;
    } catch (error) {
      throw new Error("Failed to get escrows by project", { cause: error });
    }
  }
}
