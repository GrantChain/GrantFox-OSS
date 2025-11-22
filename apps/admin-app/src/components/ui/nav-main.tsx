"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  url: string;
  icon: LucideIcon;
  items?: {
    name: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive =
            item.url === "/dashboard"
              ? pathname === item.url
              : pathname === item.url || pathname.startsWith(item.url + "/");

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isParentActive}>
                <Link
                  href={item.url}
                  className={cn(isParentActive ? "bg-muted/90" : "")}
                >
                  <item.icon className={cn(isParentActive && "text-primary")} />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>

              {item.items && item.items.length > 0 && (
                <SidebarMenuSub>
                  {item.items.map((subItem) => {
                    const isSubActive =
                      pathname === subItem.url ||
                      pathname.startsWith(subItem.url + "/");

                    return (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton asChild isActive={isSubActive}>
                          <Link href={subItem.url}>
                            <span>{subItem.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
