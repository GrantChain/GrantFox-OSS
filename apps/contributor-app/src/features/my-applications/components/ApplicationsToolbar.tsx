"use client";

import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import type { ApplicationRow } from "@/types/applications.type";

export type ApplicationsToolbarProps = {
  /** React Table instance to control filters and visibility */
  table: Table<ApplicationRow>;
};

export const ApplicationsToolbar: React.FC<ApplicationsToolbarProps> =
  React.memo(({ table }) => {
    return (
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={
            (table.getColumn("status")?.getFilterValue() as string) ?? "ALL"
          }
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "ALL" ? undefined : value)
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="AWAITING_ASSIGNMENT">
              Awaiting assignment
            </SelectItem>
            <SelectItem value="PR_EXPECTED">PR expected</SelectItem>
            <SelectItem value="IN_REVIEW">In review</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ASSIGNED_TO_OTHER">
              Assigned to another
            </SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  });

ApplicationsToolbar.displayName = "ApplicationsToolbar";
