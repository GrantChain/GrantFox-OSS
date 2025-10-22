import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { UserOrganization } from "@/types/github.type";

type UserOrganizationCardProps = {
  organization: UserOrganization;
  selected?: boolean;
  onSelect?: (login: string) => void;
};

export const UserOrganizationCard = ({
  organization,
  selected = false,
  onSelect,
}: UserOrganizationCardProps) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(organization.login)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.(organization.login);
      }}
      className={`w-full max-w-md overflow-hidden transition-all cursor-pointer border ${
        selected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border hover:shadow-lg"
      }`}
    >
      <CardContent>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={organization.avatar_url || "/placeholder.svg"}
              alt={organization.login}
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {organization.login}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {organization.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
