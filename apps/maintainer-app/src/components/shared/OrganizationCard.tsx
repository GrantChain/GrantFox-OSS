"use client";

import {
  MapPin,
  Mail,
  Twitter,
  Globe,
  Github,
  Users,
  Code2,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GithubOrganization } from "@/types/github.type";
import Link from "next/link";
import { RainbowButton } from "../ui/rainbow-button";

interface GithubOrgCardProps {
  organization: GithubOrganization;
}

export const GithubOrgCard = ({ organization }: GithubOrgCardProps) => {
  const createdDate = new Date(organization.created_at).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="w-full h-auto lg:h-full flex flex-col bg-card border border-border shadow-lg">
      {/* Content */}
      <div className="flex-1 flex flex-col p-6 sm:p-8 space-y-6">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center -mt-20 mb-4">
          <div className="relative mb-4">
            <Image
              src={organization.avatar_url || "/placeholder.svg"}
              alt={organization.name}
              width={96}
              height={96}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-card bg-card shadow-lg object-cover"
            />
            {organization.is_verified && (
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-card">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center text-balance">
            {organization.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            @{organization.login}
          </p>
        </div>

        {/* Description */}
        {organization.description && (
          <p className="text-sm sm:text-base text-foreground/80 text-center leading-relaxed text-balance">
            {organization.description ||
              organization.description == null ||
              "No description provided."}
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 border-y border-border">
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <Code2 className="w-5 h-5 text-primary mb-2" />
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {organization.public_repos}
            </p>
            <p className="text-xs text-muted-foreground">Repositories</p>
          </div>

          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {(organization.followers / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          {organization.location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground/80">
                {organization.location}
              </span>
            </div>
          )}

          {organization.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={`mailto:${organization.email}`}
                className="text-foreground/80 hover:text-primary transition-colors truncate"
              >
                {organization.email}
              </a>
            </div>
          )}

          {organization.blog && (
            <div className="flex items-center gap-3 text-sm">
              <Globe className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={organization.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors truncate"
              >
                {organization.blog.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {organization.twitter_username && (
            <div className="flex items-center gap-3 text-sm">
              <Twitter className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={`https://twitter.com/${organization.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                @{organization.twitter_username}
              </a>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground/80">Created on {createdDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4">
          <Button
            asChild
            variant="outline"
            className="w-full border-border hover:bg-muted bg-transparent"
          >
            <Link
              href={`https://github.com/orgs/${organization.login}/repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="w-4 h-4 mr-2" />
              See Repositories
            </Link>
          </Button>

          <Link
            href={organization.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RainbowButton className="w-full">
              <>
                <Code2 className="w-4 h-4 mr-2" />
                See on GitHub
              </>
            </RainbowButton>
          </Link>
        </div>
      </div>
    </Card>
  );
};
