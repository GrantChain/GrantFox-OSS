"use client";

import { CampaignProvider } from "@/context/CampaignContext";
import { Back } from "@/components/shared/Back";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { user, loading } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.replace("/signin");
  //   }
  // }, [loading, user, router]);

  // if (loading || !user) {
  //   return null;
  // }

  return (
    <CampaignProvider>
      <div className="block container mx-auto px-4 py-8 min-h-[calc(100vh-56px)]">
        <Back />
        {children}
      </div>
    </CampaignProvider>
  );
}
