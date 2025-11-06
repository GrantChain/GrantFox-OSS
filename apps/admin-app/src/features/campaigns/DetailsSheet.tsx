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
import {
  CalendarIcon,
  Folder,
  GithubIcon,
  Maximize,
  TagIcon,
} from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export const DetailsSheet = () => {
  const { openDetails, setOpenDetails, campaign } = useCampaignContext();
  const { data } = useCampaignDetailsQuery(campaign?.campaign_id);
  const hasProjects = (data?.total_projects ?? 0) > 0;
  const hasRepos = (data?.total_repositories ?? 0) > 0;

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

          <Link href={`/dashboard/campaigns/${campaign?.campaign_id}`}>
            <ShimmerButton className="shadow-2xl mx-auto my-2">
              <span className="flex items-center gap-2 text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white dark:from-white dark:to-slate-900/10">
                <Maximize className="size-4 text-muted-foreground" />
                More Details
              </span>
            </ShimmerButton>
          </Link>

          <p className="text-sm text-muted-foreground">
            {campaign?.description}
          </p>

          {(hasProjects || hasRepos) &&
            (hasProjects && hasRepos ? (
              <div className="flex flex-col sm:flex-row gap-2">
                {hasProjects && (
                  <Card className="w-full sm:w-1/2 p-4 flex items-center gap-2 text-sm flex-col">
                    <Folder className="size-4 text-muted-foreground" />
                    <TextAnimate
                      className="text-lg font-medium"
                      animation="blurInUp"
                      by="character"
                      once
                    >
                      Projects:
                    </TextAnimate>
                    <Badge variant="secondary">{data?.total_projects}</Badge>
                  </Card>
                )}
                {hasRepos && (
                  <Card className="w-full sm:w-1/2 p-4 flex items-center gap-2 text-sm flex-col">
                    <GithubIcon className="size-4 text-muted-foreground" />
                    <TextAnimate
                      className="text-lg font-medium"
                      animation="blurInUp"
                      by="character"
                      once
                    >
                      Repositories:
                    </TextAnimate>
                    <Badge variant="secondary">
                      {data?.total_repositories}
                    </Badge>
                  </Card>
                )}
              </div>
            ) : (
              <>
                {hasProjects && (
                  <Card className="w-full sm:w-1/2 p-4 flex items-center gap-2 text-sm flex-col">
                    <Folder className="size-4 text-muted-foreground" />
                    <TextAnimate
                      className="text-lg font-medium"
                      animation="blurInUp"
                      by="character"
                      once
                    >
                      Projects:
                    </TextAnimate>
                    <Badge variant="secondary">{data?.total_projects}</Badge>
                  </Card>
                )}
                {hasRepos && (
                  <Card className="w-full sm:w-1/2 p-4 flex items-center gap-2 text-sm flex-col">
                    <GithubIcon className="size-4 text-muted-foreground" />
                    <TextAnimate
                      className="text-lg font-medium"
                      animation="blurInUp"
                      by="character"
                      once
                    >
                      Repositories:
                    </TextAnimate>
                    <Badge variant="secondary">
                      {data?.total_repositories}
                    </Badge>
                  </Card>
                )}
              </>
            ))}

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
        </div>
      </SheetContent>
    </Sheet>
  );
};
