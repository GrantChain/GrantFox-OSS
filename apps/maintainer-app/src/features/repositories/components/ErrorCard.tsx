import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function ErrorCard({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
      <AlertTriangle className="size-10 text-destructive" />
      <span className="text-sm text-destructive">{message}</span>
    </Card>
  );
}
