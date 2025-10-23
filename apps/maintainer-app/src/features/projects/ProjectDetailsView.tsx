"use client";

import { http } from "@/lib/api";
import { ProjectsService } from "./services/projects.service";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeCheck,
  CalendarIcon,
  Code2,
  FileIcon,
  Globe,
  Heart,
  Loader2,
  MapPin,
  Twitter,
  Users,
} from "lucide-react";
import { useOrganizationQuery } from "../github/hooks/useOrganizationQuery";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectTabs } from "./tabs.constant";
import type { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useCampaignContext } from "@/context/CampaignContext";
import Image from "next/image";

export const ProjectDetailsView = ({ projectId }: { projectId: string }) => {
  const projectsService = new ProjectsService(http);
  const { activeCampaign, upcomingCampaign } = useCampaignContext();

  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsService.getProject(projectId),
    enabled: !!projectId,
  });

  const project = query.data;

  const orgQuery = useOrganizationQuery({
    orgHandle: project?.github_handle ?? null,
    enabled: !!project?.github_handle,
  });

  if (query.isLoading || (orgQuery.isLoading && !!project?.github_handle)) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <Loader2 className="size-10 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </Card>
    );
  }

  const organizationData = orgQuery.data;

  if (query.isFetched && !project) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">No project found</span>
      </Card>
    );
  }

  if (!!project?.github_handle && orgQuery.isFetched && !organizationData) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">
          Organization not found
        </span>
      </Card>
    );
  }

  if (!organizationData) {
    return null;
  }

  const tabs = getProjectTabs(
    project?.github_handle ?? undefined,
    projectId,
    project?.status
  );

  type TabDef = { name: string; value: string; content: ReactNode };

  const renderStatusVariant = (
    status?: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    const s = (status ?? "").toUpperCase();
    if (s === "APPROVED") return "default";
    if (s === "PENDING") return "destructive";
    if (s === "REJECTED") return "destructive";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* General Info Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur mb-3">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-shrink-0">
                <Image
                  width={96}
                  height={96}
                  src={organizationData.avatar_url || "/placeholder.svg"}
                  alt={organizationData.name}
                  className="w-24 h-24 rounded-lg border border-border"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {organizationData.name}
                  </h2>
                  {project?.status ? (
                    <Badge variant={renderStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                  ) : null}
                </div>
                <p className="text-muted-foreground mb-4">
                  {organizationData.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {organizationData.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{organizationData.location}</span>
                    </div>
                  )}
                  {organizationData.blog && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4" />
                      <Link
                        href={organizationData.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Website
                      </Link>
                    </div>
                  )}
                  {organizationData.twitter_username && (
                    <div className="flex items-center gap-2 text-sm">
                      <Twitter className="w-4 h-4" />
                      <Link
                        href={`https://twitter.com/${organizationData.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @{organizationData.twitter_username}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Stats & Networks */}
          <div className="space-y-3 w-full md:max-w-3/12">
            {/* Stats Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code2 className="w-4 h-4" />
                      <span>Repositories</span>
                    </div>
                    <Badge variant="secondary">
                      {organizationData.public_repos}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Followers</span>
                    </div>
                    <Badge variant="secondary">
                      {organizationData.followers}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>Following</span>
                    </div>
                    <Badge variant="secondary">
                      {organizationData.following}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Created</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(organizationData.created_at)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Last Updated</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(organizationData.updated_at)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full my-3 border-border/50 bg-card/50 backdrop-blur">
              <BorderBeam duration={8} size={100} />
              <CardHeader>
                <CardTitle className="text-xl">Active Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <Badge variant="secondary">{activeCampaign?.name}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Start Date</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(activeCampaign?.start_date ?? "")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>End Date</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(activeCampaign?.end_date ?? "")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full my-3 border-border/50 bg-card/50 backdrop-blur">
              <BorderBeam duration={8} size={100} />
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <Badge variant="secondary">{upcomingCampaign?.name}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Start Date</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(upcomingCampaign?.start_date ?? "")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4" />
                      <span>End Date</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(upcomingCampaign?.end_date ?? "")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:max-w-9/12">
            <Tabs defaultValue="repositories" className="gap-4">
              <TabsList className="bg-background rounded-none border-b p-0 sm:gap-4 flex w-full justify-center">
                {tabs.map((tab: TabDef) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none cursor-pointer"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab: TabDef) => (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
