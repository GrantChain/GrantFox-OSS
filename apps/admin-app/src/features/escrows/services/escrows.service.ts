import { ApiEscrow } from "@/types/escrow.type";
import { AxiosInstance } from "axios";

export class EscrowService {
  private readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getEscrows(): Promise<ApiEscrow[]> {
    try {
      const { data } = await this.http.get("/escrows");
      return data;
    } catch (error) {
      throw new Error("Failed to get escrows", { cause: error });
    }
  }
}
