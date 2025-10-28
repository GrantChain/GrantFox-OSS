import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type RepoGridProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  initialCount?: number;
  step?: number;
};

export function RepoGrid<T>({
  items,
  renderItem,
  initialCount = 6,
  step = 6,
}: RepoGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState<number>(initialCount);

  const displayed = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {renderItem(item)}
          </div>
        ))}
      </div>
      {items.length > visibleCount && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + step)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
