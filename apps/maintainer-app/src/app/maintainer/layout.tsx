/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ProjectsService } from "@/features/projects/services/projects.service";
import { http } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function MaintainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const projectsService = useMemo(() => new ProjectsService(http), []);

  const projectIdFromPath = useMemo<string | null>(() => {
    // Match /maintainer/projects/:projectId(/...)? but exclude reserved namespaces like "management" and "repo"
    const match = pathname.match(
      /^\/maintainer\/projects\/(?!management(?:\/|$)|repo(?:\/|$))([^\/]+)(?:\/|$)/
    );
    const candidate = match?.[1] ?? null;
    return candidate ?? null;
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  const projectQuery = useQuery({
    queryKey: ["layout-project", projectIdFromPath],
    enabled: Boolean(user && projectIdFromPath),
    queryFn: () => projectsService.getProject(projectIdFromPath as string),
    staleTime: 1000 * 60 * 5,
  });

  const userIsMaintainer = (maintainers: unknown, userId: string): boolean => {
    if (!Array.isArray(maintainers)) return false;
    if (maintainers.length === 0) return false;
    if (typeof (maintainers as unknown[])[0] === "string") {
      return (maintainers as string[]).includes(userId);
    }
    return (maintainers as any[]).some(
      (m) => m?.user_id === userId || m?.maintainer?.user_id === userId
    );
  };

  useEffect(() => {
    if (!projectIdFromPath || !user) return;
    if (!projectQuery.isFetched) return;
    const ok = userIsMaintainer(
      (projectQuery.data as any)?.maintainers,
      user.id
    );
    if (!ok) router.replace("/maintainer/projects");
  }, [
    projectIdFromPath,
    user,
    projectQuery.isFetched,
    projectQuery.data,
    router,
  ]);

  if (loading || !user || (projectIdFromPath && projectQuery.isLoading)) {
    return null;
  }

  return (
    <ProjectProvider>
      <div className="block container mx-auto p-6">{children}</div>
    </ProjectProvider>
  );
}
