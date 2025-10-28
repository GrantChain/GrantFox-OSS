import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export function EmptyStateCard({
  icon,
  message,
}: {
  icon: ReactNode;
  message: string;
}) {
  return (
    <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
      {icon}
      <span className="text-sm text-muted-foreground">{message}</span>
    </Card>
  );
}
