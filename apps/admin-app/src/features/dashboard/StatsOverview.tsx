import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderGit2, Package, Code } from "lucide-react";

type StatsOverviewProps = {
  totalProjects: number;
  totalRepositories: number;
  totalMaintainers: number;
  totalContributors: number;
};

export function StatsOverview({
  totalProjects,
  totalRepositories,
  totalMaintainers,
  totalContributors,
}: StatsOverviewProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalProjects}</div>
          <p className="text-xs text-muted-foreground">Active in campaign</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Repositories</CardTitle>
          <FolderGit2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalRepositories}</div>
          <p className="text-xs text-muted-foreground">Connected repos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Maintainers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalMaintainers}</div>
          <p className="text-xs text-muted-foreground">Total maintainers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Contributors</CardTitle>
          <Code className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalContributors}</div>
          <p className="text-xs text-muted-foreground">Total contributors</p>
        </CardContent>
      </Card>
    </div>
  );
}
