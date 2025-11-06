"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type RechartsLegendPayload = {
  value: string | number;
  type:
    | "line"
    | "square"
    | "rect"
    | "circle"
    | "cross"
    | "diamond"
    | "star"
    | "triangle"
    | "wye"
    | "none";
  color?: string;
  id?: string;
  payload?: { strokeDasharray: string | number; value?: unknown };
};
import type { CampaignProject } from "@/types/campaign.type";
import { FileIcon } from "lucide-react";

interface CampaignChartsProps {
  projects: CampaignProject[];
  totalProjects: number;
  totalRepositories: number;
}

export function CampaignCharts({
  projects,
  totalProjects,
  totalRepositories,
}: CampaignChartsProps) {
  const repoActivityData = React.useMemo(() => {
    const counter = new Map<string, number>();

    projects.forEach((project) => {
      project.repositories.forEach((repo) => {
        if (!repo.added_to_campaign_at) return;
        const d = new Date(repo.added_to_campaign_at);
        if (isNaN(d.getTime())) return;
        const key = d.toISOString().slice(0, 10);
        counter.set(key, (counter.get(key) ?? 0) + 1);
      });
    });

    const entries = Array.from(counter.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return entries.map(([date, repositories]) => ({ date, repositories }));
  }, [projects]);

  const pieSummaryData = React.useMemo(
    () => [
      {
        name: "Projects",
        label: "Projects",
        color: "var(--chart-2)",
        value: totalProjects,
        key: "2",
      },
      {
        name: "Repositories",
        label: "Repositories",
        color: "var(--chart-4)",
        value: totalRepositories,
        key: "4",
      },
    ],
    [totalProjects, totalRepositories]
  );

  const pieLegendPayload = React.useMemo<RechartsLegendPayload[]>(
    () =>
      pieSummaryData.map((entry) => ({
        id: entry.key,
        type: "square",
        value: entry.name,
        color: entry.color,
        payload: { strokeDasharray: "", value: entry.value },
      })),
    [pieSummaryData]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="mb-2 text-sm text-muted-foreground">
          Repositories added over time
        </div>
        {repoActivityData.length === 0 ? (
          <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
            <FileIcon className="size-10" />
            <span className="text-sm text-muted-foreground">
              No repositories added over time
            </span>
          </Card>
        ) : (
          <ChartContainer
            className="max-h-[200px]"
            config={{
              repositories: {
                label: "Repositories",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <AreaChart data={repoActivityData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="repositories"
                type="monotone"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </Card>

      <Card className="p-4">
        <div className="mb-2 text-sm text-muted-foreground">
          Campaign summary
        </div>
        {pieSummaryData.every((d) => !d.value) ? (
          <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
            <FileIcon className="size-10" />
            <span className="text-sm text-muted-foreground">
              No data available.
            </span>
          </Card>
        ) : (
          <ChartContainer
            className="max-h-[200px]"
            config={{
              projects: { label: "Projects", color: "var(--chart-2)" },
              repositories: {
                label: "Repositories",
                color: "var(--chart-2)",
              },
            }}
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={pieSummaryData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={70}
                strokeWidth={2}
              >
                {pieSummaryData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={entry.color}
                    stroke={entry.color}
                  />
                ))}
              </Pie>
              <ChartLegend payload={pieLegendPayload} />
            </PieChart>
          </ChartContainer>
        )}
      </Card>
    </div>
  );
}
