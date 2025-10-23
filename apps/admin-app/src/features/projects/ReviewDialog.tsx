"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectsMutations } from "./hooks/useProjectsMutations";
import { ProjectStatus } from "@/types/project.type";
import type { ReviewPayload } from "@/types/review.type";
import { Loader2 } from "lucide-react";

type ReviewDialogProps = {
  projectId: string;
  action:
    | ProjectStatus.APPROVED
    | ProjectStatus.REJECTED
    | ProjectStatus.CHANGES_REQUESTED;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReviewDialog({
  projectId,
  action,
  open,
  onOpenChange,
}: ReviewDialogProps) {
  const { createReview } = useProjectsMutations();
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const title = useMemo(() => {
    if (action === ProjectStatus.APPROVED) return "Approve project";
    if (action === ProjectStatus.REJECTED) return "Reject project";
    return "Request changes";
  }, [action]);

  const description = useMemo(() => {
    if (action === ProjectStatus.APPROVED)
      return "Optionally provide a note for the approval.";
    if (action === ProjectStatus.REJECTED)
      return "Provide a reason for rejection.";
    return "Describe the changes required.";
  }, [action]);

  const onSubmit = async () => {
    setSubmitting(true);
    const payload: ReviewPayload = { action, reason };
    await new Promise<void>((resolve) => {
      createReview(
        { projectId, payload },
        {
          onSettled: () => {
            setSubmitting(false);
            onOpenChange(false);
            setReason("");
            resolve();
          },
        }
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !submitting && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="reason">Reason</Label>
          <Input
            id="reason"
            placeholder="Write a brief reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={submitting}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
