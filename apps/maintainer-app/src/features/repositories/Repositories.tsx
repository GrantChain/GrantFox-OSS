import { useMemo, useEffect, useState } from "react";
import { GitHubRepository } from "@/types/github.type";
import { RepositoryCard } from "./RepositoryCard";
import { Button } from "@/components/ui/button";
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

export const Repositories = ({
  orgLogin,
  projectId,
}: {
  orgLogin: string | undefined;
  projectId: string;
}) => {
  const { data, isLoading, isError } = useOrgRepositories(orgLogin);
  const registeredQuery = useProjectRepositories(projectId);

  const registeredSet = useMemo<Set<number>>(() => {
    return new Set((registeredQuery.data ?? []).map((r) => r.github_repo_id));
  }, [registeredQuery.data]);

  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const { mutateAsync: addRepositoryToProject } =
    useRegisterRepositoryToProject(projectId);

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
          const isBusy = registeringId === repository.id;
          return (
            <>
              <RepositoryCard repository={repository} />
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={async () => {
                  try {
                    setRegisteringId(repository.id);
                    await addRepositoryToProject(repository);
                  } catch (error) {
                    console.error(error);
                    toast.error("Failed to register repository to project");
                  } finally {
                    setRegisteringId(null);
                  }
                }}
                disabled={isBusy || isAlreadyRegistered}
              >
                {isAlreadyRegistered
                  ? "Repository in Project"
                  : isBusy
                    ? "Registering..."
                    : "Register to Project"}
              </Button>
            </>
          );
        }}
      />
    </div>
  );
};

export const RegisteredRepositories = ({
  projectId,
  projectStatus,
}: {
  projectId: string;
  projectStatus?: string;
}) => {
  const { activeCampaign, upcomingCampaign } = useCampaignContext();
  const targetCampaign = activeCampaign ?? upcomingCampaign;
  const { data, isLoading, isError } = useProjectRepositories(projectId);

  const [registeringRepo, setRegisteringRepo] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
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

  const canRegisterToCampaign =
    Boolean(targetCampaign?.campaign_id) && projectStatus === "APPROVED";

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
      <RepoGrid
        items={repos}
        renderItem={(repository: GitHubRepository) => {
          const isIn = targetCampaign?.campaign_id
            ? isInCampaign(repository.id)
            : false;
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
              />
              {isIn ? (
                <Button
                  variant="destructive"
                  className="cursor-pointer"
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
                      toast.error("Failed to remove repository from campaign");
                    } finally {
                      setRemovingId(null);
                    }
                  }}
                  disabled={removingId === repository.id}
                >
                  {removingId === repository.id ? "Removing..." : "Remove"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={async () => {
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
                      setCampaignRepoIds((prev) =>
                        new Set(prev).add(repository.id)
                      );
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to register repository to campaign");
                    } finally {
                      setRegisteringRepo(null);
                    }
                  }}
                  disabled={
                    registeringRepo === repository.id || !canRegisterToCampaign
                  }
                >
                  {registeringRepo === repository.id
                    ? "Registering..."
                    : "Register to Active Campaign"}
                </Button>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
