"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronDown, Projector } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";

export function UserButton() {
  const { user, loading, signOut } = useUser();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  if (!user) {
    return (
      <Link href="/signin">
        <Button size="sm" className="px-3">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-md border px-2 py-1 hover:bg-accent cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Image
          src={
            user.user_metadata?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.user_metadata?.full_name ||
                user.user_metadata?.user_name ||
                user.user_metadata?.name ||
                user.email ||
                "User"
            )}&background=random`
          }
          alt={
            user.user_metadata?.full_name ||
            user.user_metadata?.user_name ||
            user.user_metadata?.name ||
            user.email ||
            "User"
          }
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-sm">
          {user.user_metadata?.user_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email ||
            "User"}
        </span>
        <ChevronDown className="size-4 opacity-70" />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg"
          role="menu"
        >
          <div className="rounded-lg bg-card p-3">
            <Link
              href={`/profile/${user.user_metadata?.user_name}`}
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    user.user_metadata?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.user_metadata?.full_name ||
                        user.user_metadata?.user_name ||
                        user.user_metadata?.name ||
                        user.email ||
                        "User"
                    )}&background=random`
                  }
                  alt={
                    user.user_metadata?.full_name ||
                    user.user_metadata?.user_name ||
                    user.user_metadata?.name ||
                    user.email ||
                    "User"
                  }
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">
                    {user.user_metadata?.user_name ||
                      user.user_metadata?.full_name ||
                      user.user_metadata?.name ||
                      user.email ||
                      "User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.email ?? ""}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-2 rounded-lg bg-card">
            {/* <Link
              href="/apps"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
              role="menuitem"
            >
              <AppWindow className="size-4" /> My Applications
            </Link> */}
            {/* <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
              role="menuitem"
            >
              <Settings className="size-4" /> Settings
            </Link> */}
            {/* <Separator className="my-2" /> */}
            {/* <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
              role="menuitem"
            >
              <AppWindow className="size-4" /> Legacy App
            </Link> */}
            {/* <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
              role="menuitem"
            >
              <AppWindow className="size-4" /> Maintainer App
            </Link> */}

            <Separator className="my-2" />

            <Link
              href="https://maintainer.grantfox.xyz"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
              role="menuitem"
              target="_blank"
            >
              <Projector className="size-4" /> Maintainer App
            </Link>

            <button
              onClick={async () => {
                await signOut();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent rounded-lg cursor-pointer"
              role="menuitem"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
