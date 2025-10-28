import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoadingCard({ message = "Loading..." }: { message?: string }) {
  return (
    <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
      <Loader2 className="size-10 animate-spin" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </Card>
  );
}
