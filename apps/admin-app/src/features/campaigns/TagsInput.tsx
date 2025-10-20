"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TagsInput({
  initial = [],
  onChange,
}: {
  initial?: string[];
  onChange?: (tags: string[]) => void;
}) {
  const [tags, setTags] = useState<string[]>(initial);
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const t = draft.trim();
    if (!t) return;
    if (tags.includes(t)) {
      setDraft("");
      return;
    }
    const next = [...tags, t];
    setTags(next);
    onChange?.(next);
    setDraft("");
  };

  const removeTag = (t: string) => {
    const next = tags.filter((x) => x !== t);
    setTags(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Add a tag and press Add"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" className="cursor-pointer" onClick={addTag}>
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => removeTag(t)}
              className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs hover:opacity-80"
              title="Remove"
            >
              {t} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
