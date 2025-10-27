"use client";

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
      router.replace("/signin");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <CampaignProvider>
      <div className="block p-6">{children}</div>
    </CampaignProvider>
  );
}
