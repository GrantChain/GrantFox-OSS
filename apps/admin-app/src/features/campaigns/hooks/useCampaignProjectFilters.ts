"use client";

import { useCallback, useMemo, useRef, useTransition } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";

import type { CampaignProject } from "@/types/campaign.type";

type SortOption = "featured" | "alpha" | "repositories" | "maintainers";

interface FilterState {
  search: string;
  category: string;
  tech: string[];
  sort: SortOption;
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "all",
  tech: [],
  sort: "featured",
};

const SORT_COMPARATORS: Record<
  Exclude<SortOption, "featured">,
  (a: CampaignProject, b: CampaignProject) => number
> = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  repositories: (a, b) => b.repositories.length - a.repositories.length,
  maintainers: (a, b) => b.maintainers.length - a.maintainers.length,
};

const SORT_OPTIONS: SortOption[] = [
  "featured",
  "alpha",
  "repositories",
  "maintainers",
];

const SORT_OPTION_SET = new Set<SortOption>(SORT_OPTIONS);

const parseSortOption = (value: string | null): SortOption => {
  if (!value) {
    return DEFAULT_FILTERS.sort;
  }

  return SORT_OPTION_SET.has(value as SortOption)
    ? (value as SortOption)
    : DEFAULT_FILTERS.sort;
};

const normalizeTechList = (
  values: readonly string[],
  techMap: Map<string, string>
): string[] => {
  if (values.length === 0) {
    return [];
  }

  const deduped = new Set<string>();

  values.forEach((value) => {
    const normalizedKey = value.trim().toLowerCase();

    if (!normalizedKey) {
      return;
    }

    const resolved = techMap.get(normalizedKey);

    if (!resolved) {
      return;
    }

    deduped.add(resolved);
  });

  return Array.from(deduped).sort((a, b) => a.localeCompare(b));
};

const filtersAreEqual = (left: FilterState, right: FilterState): boolean => {
  if (
    left.search !== right.search ||
    left.category !== right.category ||
    left.sort !== right.sort ||
    left.tech.length !== right.tech.length
  ) {
    return false;
  }

  return left.tech.every((value, index) => value === right.tech[index]);
};

const parseFiltersFromParams = (
  params: ReadonlyURLSearchParams,
  categorySet: Set<string>,
  techMap: Map<string, string>
): FilterState => {
  const search = params.get("search")?.trim() ?? "";

  const categoryParam = params.get("category")?.trim();
  const category =
    categoryParam &&
    categoryParam !== "all" &&
    (categorySet.size === 0 || categorySet.has(categoryParam))
      ? categoryParam
      : DEFAULT_FILTERS.category;

  const techParam = params.get("tech");
  const techValues = techParam ? techParam.split(",") : [];
  const tech = normalizeTechList(techValues, techMap);

  const sort = parseSortOption(params.get("sort"));

  return {
    search,
    category,
    tech,
    sort,
  };
};

const buildQueryFromFilters = (
  baseSnapshot: string,
  filters: FilterState
): string => {
  const params = new URLSearchParams(baseSnapshot);

  params.delete("search");
  params.delete("category");
  params.delete("tech");
  params.delete("sort");

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }

  if (filters.tech.length > 0) {
    params.set("tech", filters.tech.join(","));
  }

  if (filters.sort !== "featured") {
    params.set("sort", filters.sort);
  }

  return params.toString();
};

export const useCampaignProjectFilters = (projects: CampaignProject[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const availableCategorySet = useMemo(() => {
    const set = new Set<string>();

    projects.forEach((project) => {
      if (project.category) {
        set.add(project.category);
      }
    });

    return set;
  }, [projects]);

  const availableCategories = useMemo(
    () => Array.from(availableCategorySet).sort((a, b) => a.localeCompare(b)),
    [availableCategorySet]
  );

  const availableTechMap = useMemo(() => {
    const map = new Map<string, string>();

    projects.forEach((project) => {
      project.tech_stack.forEach((tech) => {
        const normalized = tech.trim();

        if (!normalized) {
          return;
        }

        const key = normalized.toLowerCase();

        if (!map.has(key)) {
          map.set(key, normalized);
        }
      });
    });

    return map;
  }, [projects]);

  const availableTech = useMemo(
    () =>
      Array.from(availableTechMap.values()).sort((a, b) => a.localeCompare(b)),
    [availableTechMap]
  );

  const paramsSnapshot = useMemo(() => searchParams.toString(), [searchParams]);

  const filters = useMemo(
    () =>
      parseFiltersFromParams(
        searchParams,
        availableCategorySet,
        availableTechMap
      ),
    [searchParams, availableCategorySet, availableTechMap]
  );

  const commitFilters = useCallback(
    (next: FilterState) => {
      if (filtersAreEqual(filters, next)) {
        return;
      }

      const nextQuery = buildQueryFromFilters(paramsSnapshot, next);

      if (nextQuery === paramsSnapshot) {
        return;
      }

      const target = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    },
    [filters, paramsSnapshot, pathname, router, startTransition]
  );

  const updateFilters = useCallback(
    (partial: Partial<FilterState>) => {
      const next: FilterState = {
        search: ("search" in partial ? partial.search : filters.search) ?? "",
        category:
          "category" in partial
            ? (partial.category ?? "all")
            : filters.category,
        tech:
          "tech" in partial
            ? normalizeTechList(partial.tech ?? [], availableTechMap)
            : filters.tech,
        sort:
          "sort" in partial
            ? parseSortOption(partial.sort ?? null)
            : filters.sort,
      };

      const normalizedCategory =
        next.category !== "all" && !availableCategorySet.has(next.category)
          ? "all"
          : next.category;

      const normalized: FilterState = {
        search: next.search.trim(),
        category: normalizedCategory,
        tech: next.tech,
        sort: next.sort,
      };

      if (filtersAreEqual(filters, normalized)) {
        return;
      }

      commitFilters(normalized);
    },
    [filters, commitFilters, availableCategorySet, availableTechMap]
  );

  const scheduleSearchCommit = useCallback(
    (value: string, delayMs: number = 500) => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }

      searchDebounceRef.current = setTimeout(() => {
        updateFilters({ search: value });
      }, delayMs);
    },
    [updateFilters]
  );

  const commitSearchImmediate = useCallback(
    (value: string) => {
      updateFilters({ search: value });
    },
    [updateFilters]
  );

  const setCategory = useCallback(
    (value: string) => {
      updateFilters({ category: value });
    },
    [updateFilters]
  );

  const setSort = useCallback(
    (value: string) => {
      updateFilters({ sort: parseSortOption(value) });
    },
    [updateFilters]
  );

  const toggleTech = useCallback(
    (value: string) => {
      const resolved =
        availableTechMap.get(value.toLowerCase()) ?? value.trim();

      if (!resolved) {
        return;
      }

      const techSet = new Set(filters.tech);

      if (techSet.has(resolved)) {
        techSet.delete(resolved);
      } else {
        techSet.add(resolved);
      }

      updateFilters({ tech: Array.from(techSet) });
    },
    [filters.tech, updateFilters, availableTechMap]
  );

  const clearTech = useCallback(() => {
    if (filters.tech.length === 0) {
      return;
    }

    updateFilters({ tech: [] });
  }, [filters.tech.length, updateFilters]);

  const resetFilters = useCallback(() => {
    commitFilters(DEFAULT_FILTERS);
  }, [commitFilters]);

  const hasActiveFilters = useMemo(
    () => !filtersAreEqual(filters, DEFAULT_FILTERS),
    [filters]
  );

  const filteredProjects = useMemo(() => {
    if (projects.length === 0) {
      return [];
    }

    const searchValue = filters.search.toLowerCase();
    const activeCategory =
      filters.category !== "all" && availableCategorySet.has(filters.category)
        ? filters.category
        : null;
    const requiredTech = filters.tech.map((tech) => tech.toLowerCase());

    const filtered = projects.filter((project) => {
      if (activeCategory && project.category !== activeCategory) {
        return false;
      }

      if (searchValue) {
        const haystack = [
          project.name,
          project.description,
          project.category,
          project.tech_stack.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(searchValue)) {
          return false;
        }
      }

      if (requiredTech.length > 0) {
        const projectTechSet = new Set(
          project.tech_stack.map((tech) => tech.toLowerCase())
        );

        const hasAllTech = requiredTech.every((tech) =>
          projectTechSet.has(tech)
        );

        if (!hasAllTech) {
          return false;
        }
      }

      return true;
    });

    if (filters.sort === "featured") {
      return filtered;
    }

    const comparator = SORT_COMPARATORS[filters.sort];

    return [...filtered].sort((a, b) => {
      const result = comparator(a, b);

      if (result !== 0) {
        return result;
      }

      return a.name.localeCompare(b.name);
    });
  }, [projects, filters, availableCategorySet]);

  return {
    filters,
    filteredProjects,
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
  };
};
