"use client";

import Link from "next/link";

import { DotPattern } from "@/components/ui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { useMemo } from "react";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  RocketIcon,
  GitHubLogoIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { Repository } from "@/types/repositories.type";
import { Tent } from "lucide-react";
import Image from "next/image";
import { getAllApprovedProjects } from "@/features/projects/hooks/useProjects";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useUser } from "@/context/UserContext";

const files = [
  {
    name: "Trustless Work",
    body: "Trustless Work is a platform that offers escrow services.",
  },
  {
    name: "ACTA",
    body: "ACTA is a platform that offers credentials infrastructure.",
  },
  {
    name: "Stellar",
    body: "Stellar is a blockchain network designed for fast, low-cost international payments and asset transfers.",
  },
];

export function LandingView() {
  const { data: projects } = getAllApprovedProjects();
  const { user } = useUser();

  // Flatten repositories from projects; avoid GitHub API calls entirely
  const flatRepositories: Repository[] = useMemo(() => {
    const list: Repository[] = [];
    const seen = new Set<string>();
    for (const p of projects ?? []) {
      for (const r of p.repositories ?? []) {
        const key = `${r.github_url}`.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          list.push(r);
        }
      }
    }
    return list;
  }, [projects]);

  return (
    <>
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
      <main className="relative mx-auto min-h-[calc(100vh-56px)] w-full max-w-6xl px-4 py-10">
        <section className="relative z-10 mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <section className="relative z-10 flex flex-col items-start gap-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-7xl">
              Discover OSS Issues to Contribute
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground text-xl">
              Browse organizations, repositories, and issues. Find your next
              contribution fast.
            </p>

            {user && (
              <Link href="/campaigns" className="block">
                <RainbowButton variant="outline">
                  <Tent className="size-3" /> Campaign
                </RainbowButton>
              </Link>
            )}
          </section>

          <div>
            <BentoGrid className="grid-cols-2">
              <BentoCard
                name="Curated Orgs"
                description="Explore featured organizations with active repositories."
                Icon={GitHubLogoIcon}
                href="/discover"
                cta="Explore"
                className="col-span-2"
                background={
                  <Marquee
                    pauseOnHover
                    className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
                  >
                    {files.map((f, idx) => (
                      <figure
                        key={idx}
                        className={cn(
                          "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                          "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
                        )}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <div className="flex flex-col">
                            <figcaption className="text-sm font-medium dark:text-white">
                              {f.name}
                            </figcaption>
                          </div>
                        </div>
                        <blockquote className="mt-2 text-xs">
                          {f.body}
                        </blockquote>
                      </figure>
                    ))}
                  </Marquee>
                }
              />
              <BentoCard
                name="Trending Repos"
                description="See repos gaining stars and contributions."
                Icon={StarFilledIcon}
                href="/discover"
                cta="View"
                className="col-span-1"
                background={<div className="absolute inset-0" />}
              />
              <BentoCard
                name="First Issues"
                description="Good-first issues for quick wins."
                Icon={RocketIcon}
                href="/discover"
                cta="Start"
                className="col-span-1"
                background={
                  <Calendar
                    mode="single"
                    selected={new Date(2022, 4, 11, 0, 0, 0)}
                    className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
                  />
                }
              />
            </BentoGrid>
          </div>
        </section>

        <section className="relative z-10 mt-16 grid grid-cols-1 gap-8">
          <div className="relative rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10">
            <ShineBorder
              className="pointer-events-none"
              shineColor={["#7c3aed33", "#22d3ee33"]}
            />
            <h2 className="text-lg font-semibold">Repositories</h2>
            <p className="text-sm text-muted-foreground">
              Most popular repositories from approved projects.
            </p>
            <div className="space-y-3 mt-4">
              {flatRepositories.slice(0, 5).map((r: Repository) => (
                <div
                  key={r.github_url}
                  className="relative rounded-xl border p-4 hover:bg-accent/40 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <Image
                        src={(() => {
                          try {
                            if (r.github_url?.startsWith("http")) {
                              const u = new URL(r.github_url);
                              const parts = u.pathname
                                .replace(/^\//, "")
                                .split("/");
                              if (parts.length >= 1 && parts[0]) {
                                return `https://github.com/${parts[0]}.png?size=40`;
                              }
                            } else if (
                              r.github_url &&
                              r.github_url.includes("/")
                            ) {
                              const parts = r.github_url.split("/");
                              if (parts[0])
                                return `https://github.com/${parts[0]}.png?size=40`;
                            }
                          } catch {}
                          return "/favicon.ico";
                        })()}
                        alt={r.name}
                        width={28}
                        height={28}
                        className="rounded"
                      />
                      <div className="min-w-0">
                        <Link
                          href={r.github_url}
                          className="font-medium hover:underline truncate block"
                        >
                          {r.name}
                        </Link>
                        {r.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {r.description}
                          </p>
                        )}
                        {/* No dynamic GH stats to avoid API usage */}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs text-muted-foreground leading-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
