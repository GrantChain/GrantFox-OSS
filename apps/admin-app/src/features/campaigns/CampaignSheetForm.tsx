"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import Calendar05 from "@/components/ui/calendar-05";
import { DateRange } from "react-day-picker";
import { Loader2, Plus } from "lucide-react";
import { useCampaignsMutations } from "./hooks/useCampaignsMutations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagsInput } from "./TagsInput";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCampaigns } from "./hooks/useCampaigns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCampaignContext } from "@/context/CampaignContext";

type SheetMode = "create" | "edit";

type CampaignSheetFormProps = {
  mode?: SheetMode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const CampaignSheetForm = ({
  mode = "create",
  open: controlledOpen,
  onOpenChange,
}: CampaignSheetFormProps) => {
  const isEdit = mode === "edit";
  const { campaign, openEdit, setOpenEdit } = useCampaignContext();

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { form, onSubmit } = useCampaigns({
    mode,
    file,
    onSuccess: () => {
      handleOpenChange(false);
      form.reset();
      setDateRange(undefined);
      setFile(null);
      setImagePreview(null);
    },
  });

  const effectiveOpen = useMemo<boolean>(() => {
    return isEdit ? (controlledOpen ?? openEdit) : open;
  }, [isEdit, controlledOpen, openEdit, open]);

  const handleOpenChange = (next: boolean) => {
    if (isEdit) {
      if (onOpenChange) onOpenChange(next);
      else setOpenEdit(next);
    } else {
      setOpen(next);
    }
  };

  useEffect(() => {
    if (!isEdit || !campaign) return;
    if (campaign.start_date || campaign.end_date) {
      const from = campaign.start_date
        ? new Date(campaign.start_date)
        : undefined;
      const to = campaign.end_date ? new Date(campaign.end_date) : undefined;
      setDateRange({ from, to });
    }
    if (campaign.image_url) {
      setImagePreview(campaign.image_url);
    }
  }, [isEdit, campaign]);

  const handleSubmit = form.handleSubmit(onSubmit);

  const onDateChange = (range?: DateRange) => {
    setDateRange(range);
    if (range?.from) {
      const start = new Date(range.from);
      form.setValue(
        "start_date",
        new Date(
          Date.UTC(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            23,
            59,
            59
          )
        ).toISOString()
      );
    }
    if (range?.to) {
      const end = new Date(range.to);
      form.setValue(
        "end_date",
        new Date(
          Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
        ).toISOString()
      );
    }
  };

  return (
    <Sheet open={effectiveOpen} onOpenChange={handleOpenChange}>
      {!isEdit && (
        <SheetTrigger asChild>
          <Button className="cursor-pointer">
            <Plus className="mr-2 size-4" /> Create Campaign
          </Button>
        </SheetTrigger>
      )}
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? "Edit campaign" : "Create campaign"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update the campaign information."
              : "Fill the form to create a new campaign."}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-full">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-5 py-4 px-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Campaign name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div>
                        <TagsInput
                          initial={
                            isEdit
                              ? (campaign?.tags ?? [])
                              : (field.value ?? [])
                          }
                          onChange={(tags) => field.onChange(tags)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="w-full">
                <FormLabel>Date range</FormLabel>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !(
                            form.getValues("start_date") ||
                            form.getValues("end_date")
                          ) && "text-muted-foreground"
                        )}
                      >
                        {(() => {
                          const s = form.getValues("start_date");
                          const e = form.getValues("end_date");
                          return s && e
                            ? `${new Date(s).toLocaleDateString()} - ${new Date(e).toLocaleDateString()}`
                            : "Pick a date range";
                        })()}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar05 value={dateRange} onChange={onDateChange} />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.start_date ? (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.start_date.message as string}
                    </p>
                  ) : null}
                  {form.formState.errors.end_date ? (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.end_date.message as string}
                    </p>
                  ) : null}
                </div>
              </FormItem>

              <FormItem className="w-full">
                <FormLabel>Banner image</FormLabel>
                <div className="space-y-2">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="aspect-video w-full rounded-md object-cover"
                    />
                  )}
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setFile(f);
                      if (f) {
                        const url = URL.createObjectURL(f);
                        setImagePreview(url);
                      } else {
                        setImagePreview(
                          isEdit ? (campaign?.image_url ?? null) : null
                        );
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, and WebP are allowed.
                  </p>
                </div>
              </FormItem>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />{" "}
                      {isEdit ? "Saving..." : "Creating..."}
                    </>
                  ) : isEdit ? (
                    "Save"
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
