"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Command } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useSearchRepositoriesOnce,
  useSearchUsersOnce,
} from "@/features/github/hooks/useGitHubSearch";
import Link from "next/link";
import Image from "next/image";
import { Owner, Repository } from "@/types";

export function SearchCommand({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debounced = useDebounce(query, 350);

  const { data: repos } = useSearchRepositoriesOnce({
    q: debounced ? `${debounced} in:name` : "",
    sort: "stars",
    order: "desc",
    per_page: 5,
    page: 1,
  });
  const { data: users } = useSearchUsersOnce({
    q: debounced ? `${debounced} type:org` : "",
    per_page: 5,
    page: 1,
  });

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  const overlay = (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative z-10 w-full max-w-2xl rounded-xl border bg-background p-3 shadow-xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories or organizations…"
          className="w-full rounded-md border bg-background px-3 py-2 outline-none"
        />
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-medium text-muted-foreground">
              Repositories
            </div>
            <div className="space-y-1">
              {(repos?.items ?? []).map((r: Repository) => (
                <Link
                  key={r.id}
                  href={`/org/${r.owner?.login}/repo/${r.name}`}
                  onClick={close}
                  className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 hover:bg-accent"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.owner?.avatar_url}
                      alt={r.full_name}
                      className="size-6 rounded"
                    />
                    <div className="min-w-0">
                      <div className="truncate font-medium">{r.full_name}</div>
                      {r.description ? (
                        <div className="truncate text-xs text-muted-foreground">
                          {r.description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">
                    ★ {r.stargazers_count}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs font-medium text-muted-foreground">
              Organizations
            </div>
            <div className="space-y-1">
              {(users?.items ?? []).map((u: Owner) => (
                <Link
                  key={u.id}
                  href={`/org/${u.login}`}
                  onClick={close}
                  className="flex items-center gap-3 rounded-md border px-3 py-2 hover:bg-accent"
                >
                  <Image
                    src={u.avatar_url}
                    alt={u.login}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium">{u.login}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {u.html_url}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-3 py-1 text-sm text-muted-foreground hover:bg-accent"
      >
        <Command className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden md:inline rounded border bg-muted px-1.5 py-0.5 text-xs">
          ⌘ K
        </kbd>
      </button>
      {open ? createPortal(overlay, document.body) : null}
    </>
  );
}
