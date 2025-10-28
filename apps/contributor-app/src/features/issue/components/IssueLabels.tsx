import { memo, useMemo } from "react";
import type { IssueLabel } from "@/types/Github";

export interface IssueLabelsProps {
  labels: IssueLabel[] | null | undefined;
}

export const IssueLabels = memo(function IssueLabels({ labels }: IssueLabelsProps) {
  const safeLabels = useMemo(() => (Array.isArray(labels) ? labels : []), [labels]);
  if (safeLabels.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
        Labels
      </h3>
      <div className="flex flex-wrap gap-2">
        {safeLabels.map((l: IssueLabel, idx: number) => {
          const name: string = (typeof l === "string" ? l : l?.name) as string;
          const color = typeof l === "string" ? undefined : l?.color;
          return (
            <span
              key={idx}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:shadow-md hover:scale-105"
              style={
                color
                  ? {
                      backgroundColor: `#${color}20`,
                      borderColor: `#${color}50`,
                      color: `#${color}`,
                    }
                  : undefined
              }
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
});


