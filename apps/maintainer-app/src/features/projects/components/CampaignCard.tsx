import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { formatDate } from "@/lib/format";

type CampaignLike = {
  name?: string | null;
  start_date?: string | null;
  end_date?: string | null;
};

export function CampaignCard({
  title,
  campaign,
}: {
  title: string;
  campaign: CampaignLike | null | undefined;
}) {
  if (!campaign) return null;
  return (
    <Card className="w-full my-3 border-border/50 bg-card/50 backdrop-blur">
      <BorderBeam duration={8} size={100} />
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="w-4 h-4" />
              <span>Name</span>
            </div>
            <Badge variant="secondary">{campaign?.name}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="w-4 h-4" />
              <span>Start Date</span>
            </div>
            <Badge variant="secondary">
              {formatDate(campaign?.start_date ?? "")}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="w-4 h-4" />
              <span>End Date</span>
            </div>
            <Badge variant="secondary">
              {formatDate(campaign?.end_date ?? "")}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


