"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Twitter,
  Building,
  Code,
  Globe,
  Mail,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/format";
import { githubHttp } from "@/lib/http";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { GitHubUser } from "@/types/github.type";

interface ProfileViewProps {
  username: string;
}

export function ProfileView({ username }: ProfileViewProps) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.user_metadata?.user_name !== username)) {
      router.push("/signin");
      return;
    }

    const fetchGitHubUser = async () => {
      try {
        setGithubLoading(true);
        const response = await githubHttp.get(`/users/${username}`);

        if (response.status !== 200) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const data = response.data;
        setGithubUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setGithubLoading(false);
      }
    };

    if (user && user.user_metadata?.user_name === username) {
      fetchGitHubUser();
    }
  }, [user, loading, username, router]);

  if (loading || githubLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (error || !githubUser) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-destructive mb-2">
                Error
              </h1>
              <p className="text-muted-foreground">
                {error || "User not found"}
              </p>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mt-8">
        {/* Profile Header */}
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
                    <p className="text-lg text-muted-foreground">
                      @{githubUser.login}
                    </p>
                    {githubUser.bio && (
                      <p className="mt-2 text-sm">{githubUser.bio}</p>
                    )}
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

                {/* Contact Info */}
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
                    <span>
                      Joined GitHub on {formatDate(githubUser.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Joined GrantFox on {formatDate(user?.created_at ?? "")}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6 ">
          <Card className="relative overflow-hidden p-6 text-center group md:col-start-2">
            <ShineBorder
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              borderWidth={2}
              shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
            />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <NumberTicker
                value={githubUser.public_repos}
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
                value={githubUser.followers}
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
                value={githubUser.following}
                className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              />
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
