"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

type Calendar05Props = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  numberOfMonths?: number;
  className?: string;
};

export default function Calendar05({
  value,
  onChange,
  numberOfMonths = 2,
  className,
}: Calendar05Props) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    value
  );

  React.useEffect(() => {
    setDateRange(value);
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onChange?.(range);
  };

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={handleSelect}
      numberOfMonths={numberOfMonths}
      className={"rounded-lg border shadow-sm " + (className ?? "")}
    />
  );
}
