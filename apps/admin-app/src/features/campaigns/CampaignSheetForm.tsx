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
import Image from "next/image";
import { Label } from "@/components/ui/label";

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
  const [startTime, setStartTime] = useState<string>("00:00:00");
  const [endTime, setEndTime] = useState<string>("23:59:59");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const CENTRAL_TZ = "America/Guatemala";
  const CENTRAL_OFFSET = "-06:00";

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

      const getTimeInTz = (d: Date) => {
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: CENTRAL_TZ,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).formatToParts(d);
        const h = parts.find((p) => p.type === "hour")?.value ?? "00";
        const m = parts.find((p) => p.type === "minute")?.value ?? "00";
        const s = parts.find((p) => p.type === "second")?.value ?? "00";
        return `${h}:${m}:${s}`;
      };

      if (from) setStartTime(getTimeInTz(from));
      if (to) setEndTime(getTimeInTz(to));
    }
    if (campaign.image_url) {
      setImagePreview(campaign.image_url);
    }
  }, [isEdit, campaign]);

  const handleSubmit = form.handleSubmit(onSubmit);

  const toCentralISOStringWithTime = (date: Date, time: string) => {
    const [hh = "00", mm = "00", ss = "00"] = time.split(":");
    const pad = (n: number) => String(n).padStart(2, "0");
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}${CENTRAL_OFFSET}`;
  };

  const onDateChange = (range?: DateRange) => {
    setDateRange(range);
    if (range?.from) {
      const start = new Date(range.from);
      form.setValue("start_date", toCentralISOStringWithTime(start, startTime));
    }
    if (range?.to) {
      const end = new Date(range.to);
      form.setValue("end_date", toCentralISOStringWithTime(end, endTime));
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
                <div className="flex flex-col md:flex-row gap-2">
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
                          const opts: Intl.DateTimeFormatOptions = {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: CENTRAL_TZ,
                          };
                          return s && e
                            ? `${new Date(s).toLocaleString("es-ES", opts)} - ${new Date(e).toLocaleString("es-ES", opts)}`
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

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="start-time">Start time UTC-6</Label>
                    <Input
                      type="time"
                      id="start-time"
                      step="1"
                      value={startTime}
                      onChange={(e) => {
                        const t = e.target.value;
                        setStartTime(t);
                        if (dateRange?.from) {
                          form.setValue(
                            "start_date",
                            toCentralISOStringWithTime(
                              new Date(dateRange.from),
                              t
                            )
                          );
                        }
                      }}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="end-time">End time UTC-6</Label>
                    <Input
                      type="time"
                      id="end-time"
                      step="1"
                      value={endTime}
                      onChange={(e) => {
                        const t = e.target.value;
                        setEndTime(t);
                        if (dateRange?.to) {
                          form.setValue(
                            "end_date",
                            toCentralISOStringWithTime(
                              new Date(dateRange.to),
                              t
                            )
                          );
                        }
                      }}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                </div>
              </FormItem>

              <FormItem className="w-full">
                <FormLabel>Banner image</FormLabel>
                <div className="space-y-2">
                  {imagePreview && (
                    <Image
                      width={300}
                      height={300}
                      src={imagePreview}
                      alt="Preview"
                      className="aspect-video mx-auto rounded-md object-cover"
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
