"use client";

import { Header } from "@/components/shared/Header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CampaignProvider } from "@/context/CampaignContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CampaignProvider>
          <div className="block p-6">{children}</div>
        </CampaignProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
