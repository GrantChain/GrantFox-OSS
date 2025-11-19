import { ApiUser } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { formatAddress } from "../tw-blocks/helpers/format.helper";
import { User } from "lucide-react";
import Link from "next/link";

export const UserCard = ({
  user,
  wallet,
  name,
}: {
  user: ApiUser;
  wallet: string;
  name?: string;
}) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
      href={`https://github.com/${user.username}`}
      key={user.user_id}
    >
      <Card className="px-4 py-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar_url ?? ""} />
            <AvatarFallback>
              {user.username?.slice(0, 2)?.toUpperCase() ?? "MF"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1.5">
            {name && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground truncate">
                  {name}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium text-base truncate">
                {user.username ?? user.user_id}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
            <p className="text-xs text-muted-foreground truncate font-mono">
              {formatAddress(wallet, 15)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
