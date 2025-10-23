"use client";

import Image from "next/image";
import Link from "next/link";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Tent } from "lucide-react";
import { SearchCommand } from "@/components/shared/SearchCommand";
import { UserButton } from "@/components/shared/UserButton";
import { RainbowButton } from "../ui/rainbow-button";

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full  bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-1">
      <div className="mx-auto flex h-14  items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Home" className="flex items-center">
            {/* Light theme logo */}
            <Image
              src="/assets/grantfox-stellar-light.svg"
              alt="GrantFox Logo"
              width={100}
              height={100}
              className="dark:hidden"
              priority
            />
            {/* Dark theme logo */}
            <Image
              src="/assets/grantfox-stellar-dark.svg"
              alt="GrantFox Logo"
              width={100}
              height={100}
              className="hidden dark:block"
              priority
            />
          </Link>
          {/* <Link href="/discover" className="hidden sm:block">
            <ShimmerButton className="px-4 py-2 text-sm flex items-center gap-2">
              <Search className="size-3" /> Discover
            </ShimmerButton>
          </Link> */}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/campaigns" className="hidden sm:block">
            <RainbowButton variant="outline">
              <Tent className="size-3" /> Campaign
            </RainbowButton>
          </Link>

          <SearchCommand />

          <UserButton />

          <AnimatedThemeToggler
            className="size-9 rounded-md border"
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </header>
  );
};
