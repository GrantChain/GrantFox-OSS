import { useQuery } from "@tanstack/react-query";
import { GithubUserService } from '../services/users.service';
import { ApiUser } from '../../../types/user.type';
import { http } from "@/lib/api";

export const useGithubUsersQuery = () => {
  const githubUserService = new GithubUserService(http);

  const query = useQuery<ApiUser[]>({
    queryKey: ["github-users-by-role"],
    queryFn: () => githubUserService.getGithubUsersByRole(),
  });

  return query;
};
