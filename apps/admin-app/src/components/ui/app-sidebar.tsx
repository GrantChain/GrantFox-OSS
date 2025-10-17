"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  CreditCard,
  Folder,
  Frame,
  Map,
  PieChart,
  Warehouse,
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

// This is sample data.
const data = {
  items: [
    {
      name: "Project Submissions",
      url: "/projects",
      icon: Folder,
    },
    {
      name: "Campaigns",
      url: "/campaigns",
      icon: Warehouse,
    },
    {
      name: "Funding Requests",
      url: "/funding-requests",
      icon: CreditCard,
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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
