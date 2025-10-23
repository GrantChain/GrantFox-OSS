import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrganizationsService } from "@/features/github/services/organizations.service";
import { GitHubRepository } from "@/types/github.type";
import { RepositoryCard } from "./RepositoryCard";
import { useEffect, useMemo, useState } from "react";
import { RepositoriesService } from "./services/repositories.service";
import { http } from "@/lib/api";
import {
  Repository as DbRepository,
  RepositoryPayload,
  CampaignRepositoryPayload,
  AddRepositoriesToCampaignResponse,
} from "@/types/repositories.type";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, FileIcon, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GithubRepositoriesService } from "@/features/github/services/repositories.service";
import { Badge } from "@/components/ui/badge";
import { useCampaignContext } from "@/context/CampaignContext";

const orgService = new OrganizationsService();
const repoService = new RepositoriesService(http);
const ghRepoService = new GithubRepositoriesService();

export const Repositories = ({
  orgLogin,
  projectId,
}: {
  orgLogin: string | undefined;
  projectId: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<GitHubRepository[]>({
    queryKey: ["org-repos", orgLogin],
    enabled: Boolean(orgLogin),
    queryFn: async () => {
      if (!orgLogin) return [];
      return await orgService.listOrgRepos(orgLogin, {
        per_page: 100,
        type: "public",
      });
    },
  });

  const registeredQuery = useQuery<DbRepository[]>({
    queryKey: ["project-repos", projectId],
    enabled: Boolean(projectId),
    queryFn: async () => repoService.getRepositoriesByProject(projectId),
  });

  const registeredSet = useMemo<Set<number>>(() => {
    return new Set((registeredQuery.data ?? []).map((r) => r.github_repo_id));
  }, [registeredQuery.data]);

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [registeringId, setRegisteringId] = useState<number | null>(null);

  const { mutateAsync: addRepositoryToProject } = useMutation({
    mutationFn: async (repo: GitHubRepository) => {
      const payload: RepositoryPayload = {
        github_repo_id: repo.id,
        github_url: repo.html_url,
        name: repo.name,
        description: repo.description ?? "",
      };
      return await repoService.addRepositoryToProject(projectId, payload);
    },
    onSuccess: async () => {
      toast.success("Repository registered to project");
      await queryClient.invalidateQueries({
        queryKey: ["project-repos", projectId],
      });
    },
    onError: () => {
      toast.error("Failed to register repository to project");
    },
    onSettled: () => {
      setRegisteringId(null);
    },
  });

  const displayed: GitHubRepository[] = useMemo(() => {
    return (data ?? []).slice(0, visibleCount);
  }, [data, visibleCount]);

  if (!orgLogin) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <AlertTriangle className="size-10 text-destructive" />
        <span className="text-sm text-destructive">
          Select an organization to view its repositories.
        </span>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <Loader2 className="size-10 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading repositories...
        </span>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <AlertTriangle className="size-10 text-destructive" />
        <span className="text-sm text-destructive">
          Failed to load repositories.
        </span>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">
          No repositories found for this organization.
        </span>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">All of your repositories</h2>
        <p className="text-sm text-muted-foreground mt-0">
          These are all of your repositories. You can register them to your
          project.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map((repository) => {
          const isAlreadyRegistered = registeredSet.has(repository.id);
          const isBusy = registeringId === repository.id;
          return (
            <div key={repository.id} className="flex flex-col gap-2">
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
            </div>
          );
        })}
      </div>
      {data.length > visibleCount && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + 6)}
          >
            Load More
          </Button>
        </div>
      )}
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
  const queryClient = useQueryClient();
  const { activeCampaign, upcomingCampaign } = useCampaignContext();
  const targetCampaign = activeCampaign ?? upcomingCampaign;

  const { data, isLoading, isError } = useQuery<DbRepository[]>({
    queryKey: ["project-repos", projectId],
    enabled: Boolean(projectId),
    queryFn: async () => repoService.getRepositoriesByProject(projectId),
  });

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [registeringRepo, setRegisteringRepo] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const campaignReposQuery = useQuery<{ github_repo_id: number }[]>({
    queryKey: ["campaign-repos", targetCampaign?.campaign_id ?? "none"],
    enabled: Boolean(targetCampaign?.campaign_id),
    queryFn: async () =>
      repoService.getRepositoriesByCampaign(targetCampaign!.campaign_id),
    staleTime: 1000 * 30,
  });

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

  const { mutateAsync: addRepoToCampaign } = useMutation({
    mutationFn: async (repo: DbRepository) => {
      if (!targetCampaign?.campaign_id)
        throw new Error("No campaign available");
      const payload: CampaignRepositoryPayload = {
        repository_ids: [repo.github_repo_id],
      };
      return await repoService.addRepositoryToCampaign(
        targetCampaign.campaign_id,
        payload
      );
    },
    onSuccess: async (res: AddRepositoriesToCampaignResponse) => {
      if (res.added && res.added.length > 0) {
        toast.success("Repository registered to campaign");
        if (registeringRepo != null) {
          setCampaignRepoIds((prev) => new Set(prev).add(registeringRepo));
        }
      } else if (res.errors && res.errors.length > 0) {
        const details = res.errors.map((e) => e.error).join("; ");
        toast.error(
          details || res.message || "Failed to register repository to campaign"
        );
      } else {
        toast.error(res.message || "Failed to register repository to campaign");
      }
      await queryClient.invalidateQueries({
        queryKey: ["campaign-repos", targetCampaign?.campaign_id ?? "none"],
      });
    },
    onError: () => {
      toast.error("Failed to register repository to campaign");
    },
    onSettled: () => {
      setRegisteringRepo(null);
    },
  });

  const { mutateAsync: removeFromCampaign } = useMutation({
    mutationFn: async (githubRepoId: number) => {
      if (!targetCampaign?.campaign_id)
        throw new Error("No campaign available");
      return await repoService.removeRepositoryFromCampaign(
        targetCampaign.campaign_id,
        String(githubRepoId)
      );
    },
    onSuccess: async () => {
      toast.success("Repository removed from campaign");
      if (removingId != null) {
        setCampaignRepoIds((prev) => {
          const next = new Set(prev);
          next.delete(removingId);
          return next;
        });
      }
      await queryClient.invalidateQueries({
        queryKey: ["campaign-repos", targetCampaign?.campaign_id ?? "none"],
      });
    },
    onError: () => {
      toast.error("Failed to remove repository from campaign");
    },
    onSettled: () => {
      setRemovingId(null);
    },
  });

  const githubReposQuery = useQuery<GitHubRepository[]>({
    queryKey: [
      "project-repos:github-details",
      projectId,
      data?.map((d) => d.github_repo_id) ?? [],
    ],
    enabled: Boolean(projectId) && Array.isArray(data) && data.length > 0,
    queryFn: async () => {
      const ids = (data ?? []).map((d) => d.github_repo_id);
      const results = await Promise.all(
        ids.map((id) => ghRepoService.getRepositoryById(id))
      );
      return results;
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayed: GitHubRepository[] = useMemo(() => {
    const repos = githubReposQuery.data ?? [];
    return repos.slice(0, visibleCount);
  }, [githubReposQuery.data, visibleCount]);

  if (
    isLoading ||
    githubReposQuery.isLoading ||
    (targetCampaign?.campaign_id ? campaignReposQuery.isLoading : false)
  ) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <Loader2 className="size-10 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading repositories...
        </span>
      </Card>
    );
  }

  if (
    isError ||
    githubReposQuery.isError ||
    (targetCampaign?.campaign_id ? campaignReposQuery.isError : false)
  ) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <AlertTriangle className="size-10 text-destructive" />
        <span className="text-sm text-destructive">
          Failed to load repositories.
        </span>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
        <FileIcon className="size-10" />
        <span className="text-sm text-muted-foreground">
          No registered repositories.
        </span>
      </Card>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map((repository) => {
          const isIn = targetCampaign?.campaign_id
            ? isInCampaign(repository.id)
            : false;
          return (
            <div key={repository.id} className="flex flex-col gap-2">
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
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to remove repository from campaign");
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
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to register repository to campaign");
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
            </div>
          );
        })}
      </div>
      {githubReposQuery.data && githubReposQuery.data.length > visibleCount && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + 6)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
