import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Maintainer } from "@/types/maintainer.type";
import Link from "next/link";

export const MaintainerCard = ({ maintainer }: { maintainer: Maintainer }) => {
  return (
    <Link
      href={`https://github.com/${maintainer.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card
        key={maintainer.user_id}
        className="relative rounded-xl border p-4 hover:bg-accent/40 transition-all hover:-translate-y-0.5 shadow-sm mb-3"
      >
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={maintainer.avatar_url ?? ""} />
            <AvatarFallback>
              {maintainer.username?.slice(0, 2)?.toUpperCase() ?? "MF"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">
                {maintainer.username}
              </span>
              {maintainer.is_owner ? (
                <Badge variant="outline">Owner</Badge>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {maintainer.email}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
