"use client";

import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Github, UserCheck, Users } from "lucide-react";

export interface ProfileStatsProps {
  publicRepos: number;
  followers: number;
  following: number;
}

export function ProfileStats({
  publicRepos,
  followers,
  following,
}: ProfileStatsProps) {
  return (
    <Card className="relative overflow-hidden group w-full md:w-3/12">
      <ShineBorder
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        borderWidth={2}
        shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
      />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
              <Github className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Repositories</span>
          </div>
          <NumberTicker
            value={publicRepos}
            className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
        </div>

        <div className="my-4 h-px w-full bg-border" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Followers</span>
          </div>
          <NumberTicker
            value={followers}
            className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
        </div>

        <div className="my-4 h-px w-full bg-border" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Following</span>
          </div>
          <NumberTicker
            value={following}
            className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
        </div>
      </div>
    </Card>
  );
}
