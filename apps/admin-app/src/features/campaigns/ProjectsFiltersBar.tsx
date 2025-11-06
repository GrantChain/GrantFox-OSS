"use client";

import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trash2 } from "lucide-react";

type SortOption = "featured" | "alpha" | "repositories" | "maintainers";

export interface ProjectsFiltersSnapshot {
  search: string;
  category: string;
  tech: string[];
  sort: SortOption;
}

interface ProjectsFiltersBarProps {
  filters: ProjectsFiltersSnapshot;
  availableCategories: string[];
  availableTech: string[];
  scheduleSearchCommit: (value: string, delayMs?: number) => void;
  commitSearchImmediate: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
  toggleTech: (value: string) => void;
  clearTech: () => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export function ProjectsFiltersBar({
  filters,
  availableCategories,
  availableTech,
  scheduleSearchCommit,
  commitSearchImmediate,
  setCategory,
  setSort,
  toggleTech,
  clearTech,
  resetFilters,
  hasActiveFilters,
}: ProjectsFiltersBarProps) {
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-3">
      <div className="relative w-full md:max-w-xs">
        <Search className="pointer-events-none absolute left-2 top-2.5 size-4 text-muted-foreground" />
        <Input
          ref={searchRef}
          defaultValue={filters.search}
          onChange={(event) => scheduleSearchCommit(event.currentTarget.value)}
          onBlur={() => commitSearchImmediate(searchRef.current?.value ?? "")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commitSearchImmediate(searchRef.current?.value ?? "");
            }
          }}
          placeholder="Search"
          className="pl-8"
        />
      </div>

      <Select value={filters.category} onValueChange={setCategory}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {availableCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between md:w-48">
            Tech stack
            {filters.tech.length > 0 ? (
              <Badge variant="secondary" className="ml-2">
                {filters.tech.length}
              </Badge>
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Tech stack</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableTech.map((tech) => (
            <DropdownMenuCheckboxItem
              key={tech}
              checked={filters.tech.includes(tech)}
              onCheckedChange={() => toggleTech(tech)}
            >
              {tech}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={clearTech}>
            Clear selection
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Select value={filters.sort} onValueChange={setSort}>
        <SelectTrigger className="w-full md:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="alpha">Name (A-Z)</SelectItem>
          <SelectItem value="repositories">Most repositories</SelectItem>
          <SelectItem value="maintainers">Most maintainers</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters ? (
        <Button
          variant="ghost"
          className="justify-self-end md:w-auto cursor-pointer"
          onClick={resetFilters}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      ) : null}
    </div>
  );
}

