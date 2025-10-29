"use client";

import { GithubOrgCard } from "@/components/shared/OrganizationCard";
import { ProjectForm } from "./ProjectForm";
import { UserOrganizationCard } from "@/components/shared/UserOrganizationCard";
import { useMemo, useState } from "react";
import { useAvailableUserOrganizations } from "./hooks/useAvailableUserOrganizations";
import { useOrganizationQuery } from "@/features/github/hooks/useOrganizationQuery";
import { AlertTriangle } from "lucide-react";
import { Alert } from "@/components/shared/Alert";

export const ProjectManagement = () => {
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);
  const orgsQuery = useAvailableUserOrganizations();
  const orgDetailsQuery = useOrganizationQuery({
    orgHandle: selectedLogin,
    enabled: !!selectedLogin,
  });

  const organizations = orgsQuery.data ?? [];
  const loadingOrgs = orgsQuery.isFetching;
  const loadingSelected = orgDetailsQuery.isFetching;

  const selectedLoginValue = useMemo<string | undefined>(() => {
    return selectedLogin ?? undefined;
  }, [selectedLogin]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground">
            Create a new project to the OSS community and get verified by
            GrantFox and Stellar.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5">
        <h2 className="text-lg font-semibold">Select an organization</h2>
        <p className="text-muted-foreground mb-4">
          Select the organization you want to create a project for. You can see
          the details of the organization before creating a project. Couldn't
          find your organization? It might be because one of your members has
          already created a project for it.
        </p>

        {loadingOrgs ? (
          <div className="text-sm text-muted-foreground">
            Loading organizations list...
          </div>
        ) : organizations.length === 0 ? (
          <Alert
            title="Having problems finding your organization?"
            description="If you can't find your new organization, it's because you only granted access to certain ones when you first logged in. To fix this, go to the link, search for GrantFox, and allow access to your new organization — or simply revoke access and log in again."
            variant="warning"
            notFound
            link="https://github.com/settings/applications"
          >
            <p className="text-sm text-muted-foreground">
              No organizations found.
            </p>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {organizations.map((org) => (
              <UserOrganizationCard
                key={org.id}
                organization={org}
                selected={selectedLogin === org.login}
                onSelect={setSelectedLogin}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/5">
          <ProjectForm mode="create" selectedOrgLogin={selectedLoginValue} />
        </div>

        <div className="w-full md:w-2/5">
          {orgDetailsQuery.data ? (
            <GithubOrgCard organization={orgDetailsQuery.data} />
          ) : loadingSelected ? (
            <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground border rounded-md">
              Loading organization details...
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground border rounded-md p-6 text-center">
              Select an organization to preview its details here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
