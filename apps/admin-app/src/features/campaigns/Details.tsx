"use client";

import React from "react";
import { type CampaignWithProjectsAndRepos } from "@/types/campaign.type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/format";
import { Calendar, GitFork, Package } from "lucide-react";
import { ProjectCard } from "../projects/ProjectCard";
import { ProjectsFiltersBar } from "./ProjectsFiltersBar";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignCharts } from "./CampaignCharts";
import { useCampaignProjectFilters } from "./hooks/useCampaignProjectFilters";

interface CampaignDetailViewProps {
  data: CampaignWithProjectsAndRepos;
}

export const Details = ({ data }: CampaignDetailViewProps) => {
  const {
    filters,
    filteredProjects,
    availableCategories,
    availableTech,
    scheduleSearchCommit,
    commitSearchImmediate,
    setCategory,
    setSort,
    toggleTech,
    clearTech,
    resetFilters,
    hasActiveFilters,
  } = useCampaignProjectFilters(data.projects);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto space-y-6">
        {/* Campaign Header */}
        <div className="space-y-4">
          <CampaignHeader campaign={data.campaign} />

          {/* Campaign Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">
                    {formatDateTime(data.campaign.start_date)} -{" "}
                    {formatDateTime(data.campaign.end_date)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <p className="text-sm font-medium">{data.total_projects}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <GitFork className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Repositories</p>
                  <p className="text-sm font-medium">
                    {data.total_repositories}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <CampaignCharts
            projects={data.projects}
            totalProjects={data.total_projects}
            totalRepositories={data.total_repositories}
          />
        </div>

        <Separator />

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Badge variant="secondary" className="hidden md:inline-flex">
                {filteredProjects.length}
              </Badge>
            </div>
            <ProjectsFiltersBar
              filters={filters}
              availableCategories={availableCategories}
              availableTech={availableTech}
              scheduleSearchCommit={scheduleSearchCommit}
              commitSearchImmediate={commitSearchImmediate}
              setCategory={setCategory}
              setSort={setSort}
              toggleTech={toggleTech}
              clearTech={clearTech}
              resetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.length === 0 ? (
              <Card className="col-span-full p-6 text-sm text-muted-foreground">
                No projects found with the selected filters.
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project.project_id} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
