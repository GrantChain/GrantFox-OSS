import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { ProjectMaintainer } from "@/types/maintainer.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button as UIButton } from "@/components/ui/button";

export const MaintainerCard = ({
  m,
  onRemoveMaintainer,
  isLoading,
  canManage,
}: {
  m: ProjectMaintainer;
  onRemoveMaintainer: (m: ProjectMaintainer) => void;
  isLoading: boolean;
  canManage: boolean;
}) => {
  return (
    <Card key={m.id} className="px-3 py-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={m.maintainer?.avatar_url ?? ""} />
          <AvatarFallback>
            {m.maintainer?.username?.slice(0, 2)?.toUpperCase() ?? "MF"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">
              {m.maintainer?.username ?? m.maintainer_id}
            </span>
            {m.is_owner ? <Badge variant="outline">Owner</Badge> : null}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {m.maintainer?.email}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive cursor-pointer"
              disabled={isLoading || m.is_owner || !canManage}
              title="Remove maintainer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove maintainer</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove{" "}
                {m.maintainer?.username ?? "this user"} from the project?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <UIButton variant="outline" className="cursor-pointer">
                  Cancel
                </UIButton>
              </DialogClose>
              <DialogClose asChild>
                <UIButton
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => onRemoveMaintainer(m)}
                  disabled={isLoading}
                >
                  Remove
                </UIButton>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};
