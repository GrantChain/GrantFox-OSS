"use client";

import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";
import { Loader2 } from "lucide-react";

export function LoaderCard({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md rounded-xl border p-6",
        className
      )}
    >
      <ShineBorder
        className="pointer-events-none"
        shineColor={["#7c3aed33", "#22d3ee33"]}
      />
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full border bg-card">
          <Loader2 className="size-5 animate-spin" />
        </div>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {subtitle ? (
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
