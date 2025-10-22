"use client";

import { GithubOrgCard } from "@/components/shared/OrganizationCard";
import { ProjectForm } from "./ProjectForm";
import { GithubOrganization, UserOrganization } from "@/types/github.type";
import { UserOrganizationCard } from "@/components/shared/UserOrganizationCard";
import { useEffect, useMemo, useState } from "react";
import { OrganizationsService } from "@/features/github/services/organizations.service";

const orgService = new OrganizationsService();

export const ProjectManagement = () => {
  const [organizations, setOrganizations] = useState<UserOrganization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState<boolean>(true);
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] =
    useState<GithubOrganization | null>(null);
  const [loadingSelected, setLoadingSelected] = useState<boolean>(false);

  useEffect(() => {
    const loadOrgs = async () => {
      setLoadingOrgs(true);
      try {
        const data = await orgService.getOrganizationsByAuthenticatedUser();
        setOrganizations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingOrgs(false);
      }
    };
    loadOrgs();
  }, []);

  useEffect(() => {
    const fetchSelected = async () => {
      if (!selectedLogin) {
        setSelectedOrganization(null);
        return;
      }
      setLoadingSelected(true);
      try {
        const org = await orgService.getOrganization(selectedLogin);
        setSelectedOrganization(org);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSelected(false);
      }
    };
    fetchSelected();
  }, [selectedLogin]);

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
          the details of the organization before creating a project.
        </p>
        {loadingOrgs ? (
          <div className="text-sm text-muted-foreground">
            Loading organizations list...
          </div>
        ) : organizations.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No organizations found.
          </div>
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
          {selectedOrganization ? (
            <GithubOrgCard organization={selectedOrganization} />
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
