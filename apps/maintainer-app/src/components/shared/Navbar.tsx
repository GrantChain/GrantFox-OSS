"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { UserButton } from "./UserButton";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { Folder, Tent } from "lucide-react";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="relative z-50 container mx-auto p-4 flex flex-col gap-3 justify-center sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        aria-label="Home"
        className="flex items-center justify-center"
      >
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

      {user && (
        <NavigationMenu
          viewport={isMobile}
          className="w-full mx-auto sm:w-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2"
        >
          <NavigationMenuList className="w-full flex-col items-center justify-center text-center gap-2 sm:flex-row sm:flex-wrap sm:gap-0">
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                        href="#"
                      >
                        <FolderOpenDot className="size-10" />
                        <div className="text-lg font-medium sm:mt-4">
                          Launch your Project!
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Our admins will review your project and approve it.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/projects" title="Your Projects">
                    View all your projects and their status.
                  </ListItem>
                  <ListItem href="/reviews" title="Feedback">
                    View all your feedback and reviews.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            <NavigationMenuItem className="w-full sm:w-auto">
              <Link
                href="/maintainer/projects"
                className={navigationMenuTriggerStyle({
                  className: `${
                    pathname === "/maintainer/projects" ||
                    pathname === "/maintainer/project-management" ||
                    pathname.startsWith("/maintainer/projects/")
                      ? "bg-muted/90"
                      : ""
                  } w-full justify-center text-center sm:w-auto gap-2`,
                })}
              >
                <Folder className="size-4" /> Projects
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full sm:w-auto">
              <Link
                href="/maintainer/campaigns"
                className={navigationMenuTriggerStyle({
                  className: `${
                    pathname === "/maintainer/campaigns" ? "bg-muted/90" : ""
                  } w-full justify-center text-center sm:w-auto gap-2`,
                })}
              >
                <Tent className="size-4" /> Campaign
              </Link>
            </NavigationMenuItem>

            {/* <NavigationMenuItem className="w-full sm:w-auto">
              <Link
                href="/maintainer/financial"
                className={navigationMenuTriggerStyle({
                  className: `${
                    pathname === "/maintainer/financial" ||
                    pathname.startsWith("/maintainer/financial/")
                      ? "bg-muted/90"
                      : ""
                  } w-full justify-center text-center sm:w-auto gap-2`,
                })}
              >
                <Wallet className="size-4" /> Financial
              </Link>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem className="w-full sm:w-auto">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle({
                  className: `${
                    pathname === "/maintainer/financials" ? "bg-muted/90" : ""
                  } w-full justify-center text-center sm:w-auto`,
                })}
              >
                <Link href="/maintainer/financials">Financials</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:ml-auto">
        <NotificationBell />
        
        <UserButton />

        <AnimatedThemeToggler
          className="size-9 rounded-md border"
          aria-label="Toggle theme"
        />
      </div>
    </div>
  );
};

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
