import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type RepositoryGrowthPoint = {
  date: string;
  repositories: number;
};

type RepositoryGrowthChartProps = {
  data: RepositoryGrowthPoint[];
};

export function RepositoryGrowthChart({ data }: RepositoryGrowthChartProps) {
  return (
    <Card className="lg:col-span-7 xl:col-span-8 overflow-hidden">
      <CardHeader>
        <CardTitle>Repository Growth</CardTitle>
        <CardDescription>Cumulative repositories added to campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            repositories: {
              label: "Repositories",
              color: "var(--chart-1)",
            },
          }}
          className="h-[280px] md:h-[340px] w-11/12 sm:min-w-full"
        >
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="repositories"
              stroke="var(--color-repositories)"
              fill="var(--color-repositories)"
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


