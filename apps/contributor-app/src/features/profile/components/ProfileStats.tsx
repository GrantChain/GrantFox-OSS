"use client";

import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";

export interface ProfileStatsProps {
  publicRepos: number;
  followers: number;
  following: number;
}

export function ProfileStats({ publicRepos, followers, following }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6 ">
      <Card className="relative overflow-hidden p-6 text-center group md:col-start-2">
        <ShineBorder
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          borderWidth={2}
          shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <NumberTicker
            value={publicRepos}
            className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
          <div className="text-xs text-muted-foreground">Repositories</div>
        </div>
      </Card>

      <Card className="relative overflow-hidden p-6 text-center group">
        <ShineBorder
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          borderWidth={2}
          shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <NumberTicker
            value={followers}
            className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
      </Card>

      <Card className="relative overflow-hidden p-6 text-center group">
        <ShineBorder
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          borderWidth={2}
          shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <NumberTicker
            value={following}
            className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          />
          <div className="text-xs text-muted-foreground">Following</div>
        </div>
      </Card>
    </div>
  );
}


