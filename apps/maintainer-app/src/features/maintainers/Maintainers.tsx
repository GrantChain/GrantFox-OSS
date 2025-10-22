"use client";

import { useMemo, useState } from "react";
import { SearchUserForm } from "@/features/maintainers/SearchMaintainerForm";
import { UserDetails } from "./MaintainerDetails";
import { GitHubUser } from "@/types/github.type";
import { MaintainerPayload, ProjectMaintainer } from "@/types/maintainer.type";
import { MaintainerService } from "./services/maintainer.service";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { MaintainerCard } from "./MaintainerCard";
import { ApiUser } from "@/types/user.type";
import { useUser } from "@/context/UserContext";

export const Maintainers = ({ projectId }: { projectId: string }) => {
  const { user } = useUser();
  const [selectedUserLogin, setSelectedUserLogin] = useState<string | null>(
    null
  );
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [apiUserByLogin, setApiUserByLogin] = useState<Record<string, ApiUser>>(
    {}
  );
  const maintainerService = new MaintainerService();
  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => ["project-maintainers", projectId],
    [projectId]
  );

  const { data: maintainers, isLoading: isLoadingMaintainers } = useQuery<
    ProjectMaintainer[]
  >({
    queryKey,
    queryFn: () => maintainerService.getMaintainersByProject(projectId),
  });

  // Check if the current user is the owner of the project
  const canManage = useMemo<boolean>(() => {
    if (!user?.id || !maintainers) return false;
    const me = maintainers.find((m) => m.maintainer?.user_id === user.id);
    return Boolean(me?.is_owner);
  }, [user?.id, maintainers]);

  const addMaintainerMutation = useMutation({
    mutationFn: (payload: MaintainerPayload) =>
      maintainerService.addMaintainerToProject(projectId, payload),
    onSuccess: () => {
      toast.success("Maintainer added to project");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => toast.error("Failed to add maintainer"),
  });

  const removeMaintainerMutation = useMutation({
    mutationFn: (maintainerId: string) =>
      maintainerService.removeMaintainerFromProject(projectId, maintainerId),
    onSuccess: () => {
      toast.success("Maintainer removed");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => toast.error("Failed to remove maintainer"),
  });

  const handleAddMaintainer = async (user: GitHubUser) => {
    if (!canManage) {
      toast.error("Only the owner can add maintainers");
      return;
    }
    const apiUser = apiUserByLogin[user.login];
    if (!apiUser?.user_id) {
      toast.error("Maintainer not found in allowed list");
      return;
    }
    const payload: MaintainerPayload = {
      maintainer_id: apiUser.user_id,
      is_owner: false,
    };
    await addMaintainerMutation.mutateAsync(payload);
    // Clear details after adding
    setSelectedUserLogin(null);
  };

  const handleRemoveMaintainer = async (pm: ProjectMaintainer) => {
    if (!canManage) {
      toast.error("Only the owner can remove maintainers");
      return;
    }
    const targetUserId = pm.maintainer?.user_id ?? pm.maintainer_id;
    if (!targetUserId) {
      toast.error("Invalid maintainer id");
      return;
    }
    await removeMaintainerMutation.mutateAsync(targetUserId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Search and List */}
      <div className="lg:col-span-1 space-y-4">
        <SearchUserForm
          excludedUserIds={(maintainers ?? [])
            .map((m) => m.maintainer?.user_id ?? m.maintainer_id)
            .filter((id): id is string => Boolean(id))}
          onUserFound={(githubUser: GitHubUser, apiUser: ApiUser) => {
            setUsers((prev) => {
              const exists = prev.some((u) => u.login === githubUser.login);
              return exists ? prev : [...prev, githubUser];
            });
            setApiUserByLogin((prev) => ({
              ...prev,
              [githubUser.login]: apiUser,
            }));
            setSelectedUserLogin(githubUser.login);
          }}
        />
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Current Maintainers</h3>
          <p className="text-xs text-muted-foreground">
            The following users are currently added as maintainers to the
            project.
          </p>
          {isLoadingMaintainers ? (
            <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
              <Loader2 className="size-10 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Loading maintainers...
              </span>
            </Card>
          ) : !maintainers || maintainers.length === 0 ? (
            <Card className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
              <FileIcon className="size-10" />
              <span className="text-sm text-muted-foreground">
                No maintainers yet
              </span>
            </Card>
          ) : (
            <div className="space-y-2">
              {maintainers.map((m) => (
                <MaintainerCard
                  key={m.id}
                  m={m}
                  onRemoveMaintainer={handleRemoveMaintainer}
                  isLoading={removeMaintainerMutation.isPending}
                  canManage={canManage}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - User Details */}
      <div className="lg:col-span-2">
        {selectedUserLogin ? (
          <UserDetails
            user={users.find((u) => u.login === selectedUserLogin)}
            onAddMaintainer={handleAddMaintainer}
            isLoading={addMaintainerMutation.isPending}
            canManage={canManage}
          />
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Select a user to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
