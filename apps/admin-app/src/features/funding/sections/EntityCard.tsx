import { UserCard } from "@/components/shared/UserCard";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/http";
import { ApiUser } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const EntityCard = ({
  address,
  name,
}: {
  address: string;
  name?: string;
}) => {
  const authService = new AuthService(http);

  const { data: user } = useQuery<ApiUser | null>({
    queryKey: ["user", address],
    queryFn: () => authService.getUserByAddress(address),
    enabled: Boolean(address),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: false,
  });

  if (!user) return null;

  return <UserCard user={user} wallet={address} name={name} />;
};
