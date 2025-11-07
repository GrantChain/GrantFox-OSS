import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TechStackPoint = {
  tech: string;
  projects: number;
};

type TechStackBarProps = {
  data: TechStackPoint[];
  className?: string;
};

export function TechStackBar({ data, className }: TechStackBarProps) {
  return (
    <Card className={className ?? ""}>
      <CardHeader>
        <CardTitle>Popular Technologies</CardTitle>
        <CardDescription>Most used tech stack across projects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            projects: {
              label: "Projects",
              color: "var(--chart-2)",
            },
          }}
          className="h-[260px] md:h-[320px] w-11/12 sm:min-w-full"
        >
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="tech" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="projects" fill="var(--color-projects)" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`tech-${index}`} fill={`var(--chart-${(index % 6) + 1})`} />
              ))}
              <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


