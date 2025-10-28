"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Repository } from "@/types/Github";
import {
  useGitHubContributors,
  useGitHubLanguages,
} from "@/features/github/hooks/useGitHubRepos";
import { Progress } from "@/components/ui/progress";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import Image from "next/image";

interface RepoAsideProps {
  repo: Repository;
  org: string;
}

export const RepoAside = ({ repo, org }: RepoAsideProps) => {
  const { data: langs } = useGitHubLanguages(org, repo.name);

  const languages = React.useMemo(() => {
    const entries = Object.entries(langs ?? {});
    const total = entries.reduce((acc, [, bytes]) => acc + bytes, 0);
    if (total === 0) return [] as { name: string; percentage: number }[];
    return entries
      .map(([name, bytes]) => ({
        name,
        percentage: +((bytes / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [langs]);

  const owner = repo.owner?.login ?? "";
  const { data: contributors } = useGitHubContributors(owner, repo.name);

  const topCount = Math.min(contributors?.length ?? 0, 10);
  const avatarUrls = (contributors ?? [])
    .slice(0, topCount)
    .map((c) => ({ imageUrl: c.avatar_url, profileUrl: c.html_url }));

  const remaining = Math.max((contributors ?? []).length - topCount, 0);

  return (
    <div className="space-y-4 sticky top-4">
      {/* Repo Card */}
      <Card className="border-0 bg-card/50 backdrop-blur">
        <CardContent>
          <div className="space-y-4">
            {/* Avatar and Name */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Image
                  src={repo.owner?.avatar_url ?? ""}
                  alt={repo.owner?.login ?? ""}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{repo.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{org}</p>
              </div>
            </div>

            {/* Description */}
            {repo.description && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {repo.description}
              </p>
            )}

            {/* GitHub Link */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full gap-2 bg-transparent"
            >
              <Link
                href={repo.html_url ?? `https://github.com/${org}/${repo.name}`}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-3 h-3" />
                Open on GitHub
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      {/* <Card className="border-0 bg-card/50 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Community</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
          >
            <Link
              href={`https://github.com/${org}/${repo.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-3 h-3" />
              GitHub
            </Link>
          </Button>
        </CardContent>
      </Card> */}

      {/* Languages Section */}
      <Card className="border-0 bg-card/50 backdrop-blur gap-2">
        <CardHeader>
          <CardTitle className="text-sm">Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">
                  {lang.percentage}%
                </span>
              </div>
              <Progress value={lang.percentage} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contributors Section */}
      <Card className="border-0 bg-card/50 backdrop-blur gap-2">
        <CardHeader>
          <CardTitle className="text-sm">Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarCircles numPeople={remaining} avatarUrls={avatarUrls} />
        </CardContent>
      </Card>
    </div>
  );
};
