import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Globe,
  Twitter,
  Code2,
  Users,
  Heart,
  CalendarIcon,
  LucideIcon,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import type { ReactNode } from "react";
import { GithubOrganization } from "@/types/github.type";

type StatusVariant = "default" | "secondary" | "destructive" | "outline";

function getStatusBadgeVariant(status?: string): StatusVariant {
  const s = (status ?? "").toUpperCase();
  if (s === "APPROVED") return "default";
  if (s === "PENDING") return "destructive";
  if (s === "REJECTED") return "destructive";
  return "outline";
}

export function GeneralInfoCard({
  organization,
  projectStatus,
  extraRightContent,
}: {
  organization: GithubOrganization;
  projectStatus?: string;
  extraRightContent?: ReactNode;
}) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur mb-3">
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Image
              width={120}
              height={120}
              src={organization.avatar_url || "/placeholder.svg"}
              alt={organization.name}
              className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl border-2 border-border shadow-sm"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header with name and status */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {organization.name}
                </h2>
                {projectStatus && (
                  <Badge
                    variant={getStatusBadgeVariant(projectStatus)}
                    className="text-xs"
                  >
                    {projectStatus}
                  </Badge>
                )}
              </div>
              {organization.description && (
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {organization.description}
                </p>
              )}
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-4">
              {organization.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{organization.location}</span>
                </div>
              )}
              {organization.blog && (
                <Link
                  href={organization.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
                >
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span>Website</span>
                </Link>
              )}
              {organization.twitter_username && (
                <Link
                  href={`https://twitter.com/${organization.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
                >
                  <Twitter className="w-4 h-4 flex-shrink-0" />
                  <span>@{organization.twitter_username}</span>
                </Link>
              )}
            </div>

            {/* Stats Section - Improved grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
              <StatItem
                icon={Code2}
                label="Repos"
                value={organization.public_repos}
              />
              <StatItem
                icon={Users}
                label="Followers"
                value={organization.followers}
              />
              <StatItem
                icon={Heart}
                label="Following"
                value={organization.following}
              />
              <StatItem
                icon={CalendarIcon}
                label="Created"
                value={formatDate(organization.created_at)}
                isDate
              />
              <StatItem
                icon={CalendarIcon}
                label="Updated"
                value={formatDate(organization.updated_at)}
                isDate
                className="col-span-2 sm:col-span-1"
              />
            </div>
          </div>

          {/* Extra Content Section */}
          {extraRightContent && (
            <div className="flex-shrink-0 lg:self-start">
              {extraRightContent}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
  isDate = false,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  isDate?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="w-3.5 h-3.5" />
        <span className="font-medium">{label}</span>
      </div>
      <div
        className={`text-sm font-semibold ${isDate ? "text-xs" : "text-base"} text-foreground`}
      >
        {value}
      </div>
    </div>
  );
}
