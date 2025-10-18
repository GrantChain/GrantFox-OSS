import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCampaignContext } from "@/context/CampaignContext";

export const Details = () => {
  const { openDetails, setOpenDetails, campaign } = useCampaignContext();

  return (
    <Sheet open={openDetails} onOpenChange={setOpenDetails}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{campaign?.title}</SheetTitle>
          <SheetDescription>Campaign details</SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4 overflow-auto">
          <img
            src={campaign?.image}
            alt="Banner"
            className="aspect-video w-full rounded-md object-cover"
          />
          <p className="text-sm text-muted-foreground">
            {campaign?.description}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
