import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCampaignContext } from "@/context/CampaignContext";
import { useCampaignDetailsQuery } from "./hooks/useCampaignDetailsQuery";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDate } from "@/lib/format";
import { CalendarIcon, TagIcon } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";

export const Details = () => {
  const { openDetails, setOpenDetails, campaign } = useCampaignContext();
  const { data } = useCampaignDetailsQuery(campaign?.campaign_id);

  return (
    <Sheet open={openDetails} onOpenChange={setOpenDetails}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{campaign?.name}</SheetTitle>
          <SheetDescription>Campaign details</SheetDescription>
          <Badge variant="secondary">{campaign?.status}</Badge>
        </SheetHeader>
        <div className="p-4 space-y-4 overflow-auto">
          {campaign?.image_url && (
            <Image
              width={500}
              height={500}
              src={campaign?.image_url}
              alt="Banner"
              className="aspect-video w-full rounded-md object-cover"
            />
          )}
          <p className="text-sm text-muted-foreground">
            {campaign?.description}
          </p>

          <Card className="p-4 flex items-center gap-2 text-sm flex-col">
            <CalendarIcon className="size-4 text-muted-foreground" />
            <TextAnimate
              className="text-lg font-medium"
              animation="blurInUp"
              by="character"
              once
            >
              Date Range:
            </TextAnimate>
            <span className="text-muted-foreground">
              {campaign?.start_date && formatDate(campaign?.start_date)} →{" "}
              {campaign?.end_date && formatDate(campaign?.end_date ?? "")}
            </span>
          </Card>

          {!!campaign?.tags?.length && (
            <Card className="p-4 flex items-center gap-2 text-sm flex-col">
              <TagIcon className="size-4 text-muted-foreground" />
              <TextAnimate
                className="text-lg font-medium"
                animation="blurInUp"
                by="character"
                once
              >
                Tags:
              </TextAnimate>
              <div className="flex gap-2">
                {campaign.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Card>
          )}

          {data?.repositories?.length ? (
            <div>
              <h4 className="font-medium mb-2">Repositories</h4>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {data.repositories.map((r) => (
                  <li key={r.github_repo_id}>
                    <a
                      href={r.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};
