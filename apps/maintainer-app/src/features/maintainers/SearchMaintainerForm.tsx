"use client";

import { useEffect, useMemo, useState } from "react";
import { UsersService } from "@/features/github/services/users.service";
import { GitHubUser } from "@/types/github.type";
import { AuthService } from "@/features/auth/services/auth.service";
import { ApiUser, UserRole } from "@/types/user.type";
import { httpUnauthorized } from "@/lib/api";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface SearchUserFormProps {
  onUserFound: (githubUser: GitHubUser, apiUser: ApiUser) => void;
  excludedUserIds?: string[];
}

export const SearchUserForm = ({
  onUserFound,
  excludedUserIds = [],
}: SearchUserFormProps) => {
  const [maintainers, setMaintainers] = useState<ApiUser[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [selecting, setSelecting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadMaintainers = async () => {
      setLoadingList(true);
      try {
        const authService = new AuthService(httpUnauthorized);
        const list = await authService.getUsersByRole(UserRole.MAINTAINER);
        const sanitized = (list ?? []).filter(
          (u): u is ApiUser =>
            typeof u.username === "string" && u.username.trim().length > 0
        );
        setMaintainers(sanitized);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load maintainers");
      } finally {
        setLoadingList(false);
      }
    };
    loadMaintainers();
  }, []);

  const excludedSet = useMemo(
    () => new Set(excludedUserIds),
    [excludedUserIds]
  );
  const items = useMemo(() => {
    return maintainers.filter((u) => !excludedSet.has(u.user_id));
  }, [maintainers, excludedSet]);

  const handleSelect = async (apiUser: ApiUser) => {
    if (!apiUser.username) return;
    setSelecting(true);
    try {
      const ghService = new UsersService();
      const ghUser = await ghService.getUser(apiUser.username);
      onUserFound(ghUser, apiUser);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch GitHub user");
    } finally {
      setSelecting(false);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold">Search by GitHub handle</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start cursor-pointer"
          >
            Select maintainer...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[320px] sm:w-[420px]">
          <Card className="overflow-hidden border-0">
            <Command>
              <CommandInput placeholder="Type a GitHub username..." />
              <CommandList>
                {loadingList ? (
                  <CommandEmpty>Loading maintainers...</CommandEmpty>
                ) : (
                  <CommandEmpty>No maintainers found.</CommandEmpty>
                )}
                <CommandGroup heading="Maintainers">
                  {items.map((u) => (
                    <CommandItem
                      key={u.user_id}
                      value={u.username ?? ""}
                      onSelect={() => handleSelect(u)}
                      disabled={selecting}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={u.avatar_url ?? undefined} />
                        <AvatarFallback>
                          {(u.username ?? "").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">@{u.username}</span>
                      {u.email ? (
                        <span className="ml-auto text-xs text-muted-foreground truncate">
                          {u.email}
                        </span>
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
