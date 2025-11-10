"use client";

import { Card } from "@/components/ui/card";
import { Back } from "@/components/shared/Back";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileStats } from "@/features/profile/components/ProfileStats";
import { useGithubProfile } from "@/features/profile/hooks/useGithubProfile";
import { useUser } from "@/context/UserContext";

interface ProfileViewProps {
  username: string;
}

export function ProfileView({ username }: ProfileViewProps) {
  const { user } = useUser();
  const { githubUser, loading, error } = useGithubProfile(username);

  if (loading) {
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
        <Back />
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
      <Back />

      <div className="mt-8">
        <ProfileHeader
          githubUser={githubUser}
          grantfoxJoinedAt={user?.created_at ?? null}
        />

        <ProfileStats
          publicRepos={githubUser.public_repos}
          followers={githubUser.followers}
          following={githubUser.following}
        />
      </div>
    </main>
  );
}
