"use client";

import * as React from "react";
import {
  CircleDollarSign,
  Folder,
  Home,
  SquareTerminal,
  Tent,
} from "lucide-react";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { WalletButton } from "../tw-blocks/wallet-kit/WalletButtons";

// Navigation items for the sidebar.
// "Funding" includes two nested options, similar to the shadcn "Playground" example.
const data = {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Project Submissions",
      url: "/dashboard/projects",
      icon: Folder,
    },
    {
      name: "Campaigns",
      url: "/dashboard/campaigns",
      icon: Tent,
    },
    {
      name: "Funding",
      url: "/dashboard/funding",
      icon: CircleDollarSign,
      items: [
        {
          name: "Overview",
          url: "/dashboard/funding",
        },
        {
          name: "Load Escrow",
          url: "/dashboard/funding/load",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>

      <WalletButton />

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
