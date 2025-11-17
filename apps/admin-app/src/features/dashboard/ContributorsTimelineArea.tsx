import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contributor } from "@/types/contributor.type";

type ContributorsTimelineAreaProps = {
  contributors: Contributor[];
  className?: string;
};

type ChartPoint = {
  date: string; // ISO date string (YYYY-MM-DD)
  contributors: number;
};

const chartConfig = {
  contributors: {
    label: "Contributors",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ContributorsTimelineArea({
  contributors,
  className,
}: ContributorsTimelineAreaProps) {
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  // Build daily counts from contributor registered_at
  const allPoints = React.useMemo<ChartPoint[]>(() => {
    const countsByDay = new Map<string, number>();

    for (const c of contributors ?? []) {
      const dateObj = new Date(c.registered_at);
      if (isNaN(dateObj.getTime())) continue;
      // Normalize to YYYY-MM-DD in local time
      const iso = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate()
      )
        .toISOString()
        .slice(0, 10);
      countsByDay.set(iso, (countsByDay.get(iso) ?? 0) + 1);
    }

    const sortedDays = Array.from(countsByDay.keys()).sort();
    return sortedDays.map((d) => ({
      date: d,
      contributors: countsByDay.get(d) ?? 0,
    }));
  }, [contributors]);

  const filteredData = React.useMemo<ChartPoint[]>(() => {
    if (allPoints.length === 0) return [];
    const referenceDate = new Date(
      Math.max(
        ...allPoints.map((p) => new Date(p.date + "T00:00:00").getTime())
      )
    );
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - (days - 1));

    return allPoints.filter((p) => {
      const d = new Date(p.date + "T00:00:00");
      return d >= startDate && d <= referenceDate;
    });
  }, [allPoints, timeRange]);

  return (
    <Card className={className ?? ""}>
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Contributors Added</CardTitle>
          <CardDescription>By registration date</CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(v) => setTimeRange(v as typeof timeRange)}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a range"
          >
            <SelectValue placeholder="Last 90 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 90 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[280px] md:h-[340px] w-11/12 sm:min-w-full"
        >
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value: string) => {
                const date = new Date(value + "T00:00:00");
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(String(value) + "T00:00:00");
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="contributors"
              stroke="var(--color-contributors)"
              fill="var(--color-contributors)"
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
