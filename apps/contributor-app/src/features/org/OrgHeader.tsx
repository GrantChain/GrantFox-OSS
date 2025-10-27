"use client";

import { Card } from "@/components/ui/card";
import type { Project } from "@/types/project.type";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrgHeaderProps {
  project: Project;
  org: string;
}

export const OrgHeader = ({ project, org }: OrgHeaderProps) => {
  return (
    <Card className="mb-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header Top */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Image
              width={64}
              height={64}
              src={`https://github.com/${org}.png`}
              alt={org}
              className="size-16 rounded-lg border border-border p-1"
            />

            <Link
              href={`https://github.com/${org}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold md:text-3xl">{org}</h1>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.short_description}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm leading-relaxed text-foreground/80">
            {project.description}
          </p>
        )}

        {/* Stats and Info */}
        <div className="w-full flex justify-end gap-4">
          <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2 transition-colors hover:bg-accent/50 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                <Tag className="size-4 text-muted-foreground" />
              </div>
            </div>
            <span className="text-sm font-semibold">{project.category}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
