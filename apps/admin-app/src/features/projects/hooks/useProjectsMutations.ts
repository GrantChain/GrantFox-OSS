import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/http";
import { ProjectStatus } from "@/types/project.type";
import { ReviewPayload } from "@/types/review.type";
import { ProjectService } from "../services/project.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useProjectsMutations = () => {
  const projectService = new ProjectService(http);
  const queryClient = useQueryClient();

  const createReviewMutation = useMutation({
    mutationFn: async ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: ReviewPayload;
    }) => projectService.createReview(projectId, payload),
    onSuccess: (_data, variables) => {
      const approved = variables.payload.action === ProjectStatus.APPROVED;
      toast.success(approved ? "Project approved" : "Project rejected");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: unknown) => {
      const axiosErr =
        (err as AxiosError) ?? (err as unknown as { cause: AxiosError })?.cause;
      const apiMessage =
        (axiosErr as unknown as { response: { data: { message: string } } })
          ?.response?.data?.message ??
        (
          err as unknown as {
            cause: { response: { data: { message: string } } };
          }
        )?.cause?.response?.data?.message;
      const text = Array.isArray(apiMessage)
        ? apiMessage.join(", ")
        : (apiMessage as string | undefined);
      toast.error(text || "Failed to submit review");
    },
  });

  return {
    createReview: createReviewMutation.mutate,
  };
};
