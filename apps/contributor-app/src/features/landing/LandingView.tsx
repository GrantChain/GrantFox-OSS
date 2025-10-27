"use client";

import Link from "next/link";

import { DotPattern } from "@/components/ui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import {
  RocketIcon,
  GitHubLogoIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { GitFork, Tent } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

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
  const { user } = useUser();

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
              <div className="flex items-center gap-2">
                <Link href="/campaigns" className="block">
                  <RainbowButton variant="outline">
                    <Tent className="size-3" /> Campaign
                  </RainbowButton>
                </Link>

                <Link href="/campaigns" className="block">
                  <Button variant="outline" className="cursor-pointer">
                    <GitFork className="size-3" /> My Applications
                  </Button>
                </Link>
              </div>
            )}
          </section>

          <div>
            <BentoGrid className="grid-cols-2">
              <BentoCard
                name="Curated Orgs"
                description="Explore featured organizations with active repositories."
                Icon={GitHubLogoIcon}
                href="/campaigns"
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
                href="/campaigns"
                cta="View"
                className="col-span-1"
                background={<div className="absolute inset-0" />}
              />
              <BentoCard
                name="First Issues"
                description="Good-first issues for quick wins."
                Icon={RocketIcon}
                href="/campaigns"
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
      </main>
    </>
  );
}
