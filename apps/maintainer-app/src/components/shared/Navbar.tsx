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

export const Navbar = () => {
  const isMobile = useIsMobile();
  const { user } = useUser();

  return (
    <div className="relative z-50 flex container mx-auto justify-between items-center p-4">
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

      {user && (
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
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
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/projects">Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/campaigns">Campaigns</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/financials">Financials</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <div className="flex items-center gap-3">
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
