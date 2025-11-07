import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ReposPerProjectPoint = {
  name: string;
  repositories: number;
};

type ReposPerProjectBarProps = {
  data: ReposPerProjectPoint[];
  className?: string;
};

export function ReposPerProjectBar({ data, className }: ReposPerProjectBarProps) {
  return (
    <Card className={className ?? ""}>
      <CardHeader>
        <CardTitle>Repositories per Project</CardTitle>
        <CardDescription>Projects with most repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            repositories: {
              label: "Repositories",
              color: "var(--chart-3)",
            },
          }}
          className="h-[260px] md:h-[320px] w-11/12 sm:min-w-full"
        >
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="repositories" fill="var(--color-repositories)" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`repo-${index}`} fill={`var(--chart-${(index % 6) + 1})`} />
              ))}
              <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


