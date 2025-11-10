"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { formatDate } from "@/lib/format";
import { GitHubUser } from "@/types/Github";
import {
  Building,
  Calendar,
  Code,
  Globe,
  Mail,
  MapPin,
  Twitter,
  User as UserIcon,
} from "lucide-react";

export interface ProfileHeaderProps {
  githubUser: GitHubUser;
  grantfoxJoinedAt: string | null;
}

export function ProfileHeader({ githubUser, grantfoxJoinedAt }: ProfileHeaderProps) {
  return (
    <Card className="relative overflow-hidden p-6 mb-6">
      <BorderBeam borderWidth={2} size={120} />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={githubUser.avatar_url}
              alt={githubUser.login}
              width={120}
              height={120}
              className="rounded-full border-4 border-background shadow-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {githubUser.name || githubUser.login}
                </h1>
                <p className="text-lg text-muted-foreground">@{githubUser.login}</p>
                {githubUser.bio && <p className="mt-2 text-sm">{githubUser.bio}</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                {githubUser.site_admin && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  >
                    <UserIcon className="w-3 h-3 mr-1" />
                    Staff
                  </Badge>
                )}
                {githubUser.hireable && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Available for hire
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {githubUser.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{githubUser.location}</span>
                </div>
              )}
              {githubUser.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{githubUser.email}</span>
                </div>
              )}
              {githubUser.blog && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={githubUser.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {githubUser.blog}
                  </a>
                </div>
              )}
              {githubUser.twitter_username && (
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`https://twitter.com/${githubUser.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @{githubUser.twitter_username}
                  </a>
                </div>
              )}
              {githubUser.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{githubUser.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Joined in GitHub on {formatDate(githubUser.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  Joined in GrantFox on {formatDate(grantfoxJoinedAt ?? "")}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.open(githubUser.html_url, "_blank")}
          >
            <Code className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>

          <WalletButton />
        </div>
      </div>
    </Card>
  );
}


