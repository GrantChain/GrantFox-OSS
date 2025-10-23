import { Card, CardContent } from "@/components/ui/card";
import { GithubOrganization } from "@/types/github.type";
import { Github, Globe, MapPin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProjectGeneralInfo = ({
  organization,
}: {
  organization: GithubOrganization;
}) => {
  return (
    <Card className="relative rounded-xl border p-4 hover:bg-accent/40 transition-all hover:-translate-y-0.5 shadow-sm mb-6">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-shrink-0">
            <Image
              width={96}
              height={96}
              src={organization.avatar_url || "/placeholder.svg"}
              alt={organization.name}
              className="w-24 h-24 rounded-lg border border-border"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">
                {organization.name}
              </h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {organization.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {organization.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{organization.location}</span>
                </div>
              )}
              {organization.blog && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  <Link
                    href={organization.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    Website
                  </Link>
                </div>
              )}
              {organization.twitter_username && (
                <div className="flex items-center gap-2 text-sm">
                  <Twitter className="w-4 h-4" />
                  <Link
                    href={`https://twitter.com/${organization.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @{organization.twitter_username}
                  </Link>
                </div>
              )}
              {organization.html_url && (
                <div className="flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4" />
                  <Link
                    href={organization.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    GitHub
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
