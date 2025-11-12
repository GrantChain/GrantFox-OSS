"use client";

import { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GitHubRepository } from "@/types/github.type";
import { RepositoryCard } from "./RepositoryCard";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AlertTriangle, FileIcon } from "lucide-react";
import { useCampaignContext } from "@/context/CampaignContext";
import { useOrgRepositories } from "@/features/repositories/hooks/useOrgRepositories";
import { useProjectRepositories } from "@/features/repositories/hooks/useProjectRepositories";
import { useCampaignRepositories } from "@/features/repositories/hooks/useCampaignRepositories";
import { useGithubRepositoriesByIds } from "@/features/repositories/hooks/useGithubRepositoriesByIds";
import { useRegisterRepositoryToProject } from "@/features/repositories/hooks/useRegisterRepositoryToProject";
import { useAddRepositoryToCampaign } from "@/features/repositories/hooks/useAddRepositoryToCampaign";
import { useRemoveRepositoryFromCampaign } from "@/features/repositories/hooks/useRemoveRepositoryFromCampaign";
import { LoadingCard } from "@/features/repositories/components/LoadingCard";
import { ErrorCard } from "@/features/repositories/components/ErrorCard";
import { EmptyStateCard } from "@/features/repositories/components/EmptyStateCard";
import { RepoGrid } from "@/features/repositories/components/RepoGrid";
import { useUser } from "@/context/UserContext";
import { useRemoveRepositoryFromProject } from "@/features/repositories/hooks/useRemoveRepositoryFromProject";
import { ProjectsService } from "@/features/projects/services/projects.service";
import { http } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert } from "@/components/shared/Alert";

export const Repositories = ({
  orgLogin,
  projectId,
}: {
  orgLogin: string | undefined;
  projectId: string;
}) => {
  const { user } = useUser();
  const { data, isLoading, isError } = useOrgRepositories(orgLogin);
  const registeredQuery = useProjectRepositories(projectId);
  const projectsService = new ProjectsService(http);
  const projectQuery = useQuery({
    queryKey: ["project", projectId],
    enabled: !!projectId,
    queryFn: () => projectsService.getProject(projectId),
    staleTime: 1000 * 60 * 5,
  });
  const canManageProject = useMemo(() => {
    const userId = user?.id;
    if (!userId) return false;
    const maintainers =
      (projectQuery.data?.maintainers as
        | { user_id: string; is_owner: boolean }[]
        | undefined) ?? [];
    const ownerId = maintainers.find((m) => m.is_owner)?.user_id;
    return ownerId === userId;
  }, [projectQuery.data?.maintainers, user?.id]);

  const registeredSet = useMemo<Set<number>>(() => {
    return new Set((registeredQuery.data ?? []).map((r) => r.github_repo_id));
  }, [registeredQuery.data]);

  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [removingProjectId, setRemovingProjectId] = useState<number | null>(
    null
  );
  const [confirmRemoveProjectId, setConfirmRemoveProjectId] = useState<
    number | null
  >(null);
  const { mutateAsync: addRepositoryToProject } =
    useRegisterRepositoryToProject(projectId);
  const { mutateAsync: removeFromProject } =
    useRemoveRepositoryFromProject(projectId);

  if (!orgLogin) {
    return (
      <EmptyStateCard
        icon={<AlertTriangle className="size-10 text-destructive" />}
        message="Select an organization to view its repositories."
      />
    );
  }

  if (isLoading) {
    return <LoadingCard message="Loading repositories..." />;
  }

  if (isError) {
    return <ErrorCard message="Failed to load repositories." />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyStateCard
        icon={<FileIcon className="size-10" />}
        message="No repositories found for this organization."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">All of your repositories</h2>
        <p className="text-sm text-muted-foreground mt-0">
          These are all of your repositories. You can register them to your
          project. <br />
          <strong>Note:</strong> Once registered, you can register them to a
          campaign.
        </p>
      </div>
      <RepoGrid
        items={data}
        renderItem={(repository: GitHubRepository) => {
          const isAlreadyRegistered = registeredSet.has(repository.id);
          const isBusy =
            registeringId === repository.id ||
            removingProjectId === repository.id;
          return (
            <>
              <RepositoryCard
                repository={repository}
                action={
                  canManageProject
                    ? isAlreadyRegistered
                      ? "remove"
                      : "register"
                    : "none"
                }
                actionLabel={
                  isAlreadyRegistered
                    ? removingProjectId === repository.id
                      ? "Removing..."
                      : "Remove from Project"
                    : registeringId === repository.id
                      ? "Registering..."
                      : "Register to Project"
                }
                isLoading={isBusy}
                isDangerous={isAlreadyRegistered}
                onAction={() => {
                  if (!canManageProject) return;
                  if (isAlreadyRegistered) {
                    setConfirmRemoveProjectId(repository.id);
                  } else {
                    (async () => {
                      try {
                        setRegisteringId(repository.id);
                        await addRepositoryToProject(repository);
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setRegisteringId(null);
                      }
                    })();
                  }
                }}
              />
              <AlertDialog
                open={confirmRemoveProjectId === repository.id}
                onOpenChange={(open) => {
                  if (!open) setConfirmRemoveProjectId(null);
                }}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Remove repository from project?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <strong>{repository.name}</strong> from this project? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        try {
                          setRemovingProjectId(repository.id);
                          await removeFromProject(repository.id);
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setRemovingProjectId(null);
                          setConfirmRemoveProjectId(null);
                        }
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                    >
                      Remove
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </>
          );
        }}
      />
    </div>
  );
};

export const RegisteredRepositories = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { activeCampaign, upcomingCampaign } = useCampaignContext();
  const targetCampaign = activeCampaign ?? upcomingCampaign;
  const hasActiveCampaign = !!activeCampaign?.campaign_id;
  const { data, isLoading, isError } = useProjectRepositories(projectId);

  const [registeringRepo, setRegisteringRepo] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<number | null>(null);
  const campaignReposQuery = useCampaignRepositories(
    targetCampaign?.campaign_id
  );

  // Local set synchronized with query for instant UI updates
  const [campaignRepoIds, setCampaignRepoIds] = useState<Set<number>>(
    new Set()
  );
  useEffect(() => {
    const base = new Set(
      (campaignReposQuery.data ?? []).map((r) => r.github_repo_id)
    );
    setCampaignRepoIds(base);
  }, [campaignReposQuery.data, targetCampaign?.campaign_id]);

  const isInCampaign = (repoId: number): boolean => {
    return campaignRepoIds.has(repoId);
  };

  const { mutateAsync: addRepoToCampaign } = useAddRepositoryToCampaign(
    targetCampaign?.campaign_id
  );

  const { mutateAsync: removeFromCampaign } = useRemoveRepositoryFromCampaign(
    targetCampaign?.campaign_id
  );

  const githubReposQuery = useGithubRepositoriesByIds(
    projectId,
    (data ?? []).map((d) => d.github_repo_id)
  );
  const repos = githubReposQuery.data ?? [];

  if (
    isLoading ||
    githubReposQuery.isLoading ||
    (targetCampaign?.campaign_id ? campaignReposQuery.isLoading : false)
  ) {
    return <LoadingCard message="Loading repositories..." />;
  }

  if (
    isError ||
    githubReposQuery.isError ||
    (targetCampaign?.campaign_id ? campaignReposQuery.isError : false)
  ) {
    return <ErrorCard message="Failed to load repositories." />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyStateCard
        icon={<FileIcon className="size-10" />}
        message="No registered repositories."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">
          Repositories registered to your project
        </h2>
        <p className="text-sm text-muted-foreground mt-0">
          These are all of the repositories registered to your project. You can
          register them to a campaign when your project is{" "}
          <strong>APPROVED</strong> by Stellar and GrantFox.
        </p>

        <p className="text-sm text-muted-foreground mt-0">
          All of your issues should be labeled with the campaign name.
        </p>
      </div>

      {!hasActiveCampaign && (
        <Alert
          title="No active campaign"
          description="There is no active campaign, so you can't register repositories to a campaign."
          variant="warning"
          className="w-full"
        />
      )}

      <RepoGrid
        items={repos}
        renderItem={(repository: GitHubRepository) => {
          const isIn = targetCampaign?.campaign_id
            ? isInCampaign(repository.id)
            : false;
          const isBusy =
            registeringRepo === repository.id || removingId === repository.id;

          return (
            <>
              <RepositoryCard
                repository={repository}
                rightExtra={
                  isIn && targetCampaign?.name ? (
                    <Badge variant="outline">In {targetCampaign.name}</Badge>
                  ) : isIn ? (
                    <Badge variant="outline">In campaign</Badge>
                  ) : null
                }
                action={
                  hasActiveCampaign ? (isIn ? "remove" : "register") : "none"
                }
                actionLabel={
                  hasActiveCampaign
                    ? isIn
                      ? removingId === repository.id
                        ? "Removing..."
                        : "Remove from Campaign"
                      : registeringRepo === repository.id
                        ? "Registering..."
                        : "Register to Active Campaign"
                    : undefined
                }
                isLoading={isBusy}
                isDangerous={isIn}
                onAction={
                  hasActiveCampaign
                    ? () => {
                        if (isIn) {
                          setConfirmRemoveId(repository.id);
                        } else {
                          handleRegister(repository);
                        }
                      }
                    : undefined
                }
              />
              <AlertDialog
                open={confirmRemoveId === repository.id}
                onOpenChange={(open) => {
                  if (!open) setConfirmRemoveId(null);
                }}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove from Campaign?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <strong>{repository.name}</strong> from the campaign? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        try {
                          setRemovingId(repository.id);
                          await removeFromCampaign(repository.id);
                          setCampaignRepoIds((prev) => {
                            const next = new Set(prev);
                            next.delete(repository.id);
                            return next;
                          });
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setRemovingId(null);
                          setConfirmRemoveId(null);
                        }
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Remove
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </>
          );
        }}
      />
    </div>
  );

  async function handleRegister(repository: GitHubRepository) {
    try {
      setRegisteringRepo(repository.id);
      const dbRepo = (data ?? []).find(
        (d) => d.github_repo_id === repository.id
      );
      if (!dbRepo) {
        toast.error("Repository not found in project DB list");
        return;
      }
      await addRepoToCampaign(dbRepo);
      setCampaignRepoIds((prev) => new Set(prev).add(repository.id));
    } catch (error) {
      console.error(error);
    } finally {
      setRegisteringRepo(null);
    }
  }
};
