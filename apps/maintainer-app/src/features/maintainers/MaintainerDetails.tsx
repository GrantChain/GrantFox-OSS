"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Twitter,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { GitHubUser } from "@/types/github.type";
import { formatDate } from "@/lib/format";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

interface UserDetailsProps {
  user?: GitHubUser;
  onAddMaintainer?: (user: GitHubUser) => void;
  isLoading?: boolean;
  canManage?: boolean;
}

export const UserDetails = ({
  user,
  onAddMaintainer,
  isLoading,
  canManage = false,
}: UserDetailsProps) => {
  if (!user) return null;

  return (
    <Card className="relative p-8">
      <BorderBeam borderWidth={2} size={120} />
      <div className="relative z-10 space-y-6">
        {/* User Header with Avatar */}
        <div className="flex items-start gap-4">
          <Image
            width={64}
            height={64}
            src={user.avatar_url || "/placeholder.svg"}
            alt={user.name ?? user.login}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.login}</p>
                {user.bio && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.bio}
                  </p>
                )}
              </div>
              <Badge variant="secondary">GitHub User</Badge>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Followers</p>
              <p className="font-semibold">{user.followers.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Following</p>
              <p className="font-semibold">{user.following.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Contact & Location Info */}
        <div className="space-y-3">
          {user.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm">{user.location}</span>
            </div>
          )}
          {user.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Link
                href={`mailto:${user.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {user.email}
              </Link>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm">{user.company}</span>
            </div>
          )}
          {user.twitter_username && (
            <div className="flex items-center gap-3">
              <Twitter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Link
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                @{user.twitter_username}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">
              Joined {formatDate(user.created_at)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={() => onAddMaintainer?.(user)}
            className="w-full sm:w-auto gap-2 cursor-pointer"
            disabled={!!isLoading || !canManage}
          >
            <UserPlus className="w-4 h-4" />
            {isLoading
              ? "Adding..."
              : canManage
                ? "Add as maintainer"
                : "Owner required"}
          </Button>
        </div>

        {/* Info Message */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            This user will be added as a maintainer to your project with full
            permissions. But only can be the owner.
          </p>
        </div>
      </div>
    </Card>
  );
};
