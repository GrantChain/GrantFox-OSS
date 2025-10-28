import { RepositoryCard } from "@/components/shared/RepositoryCard";
import { AnimatedList as AnimatedListComponent } from "@/components/ui/animated-list";
import { Repository } from "@/types/repositories.type";

interface AnimatedListProps {
  repositories: Repository[];
}

export function AnimatedList({ repositories }: AnimatedListProps) {
  return (
    <div className="relative flex h-[500px] w-full flex-col overflow-hidden p-2">
      <AnimatedListComponent>
        {repositories.map((item, idx) => (
          <RepositoryCard repo={item} key={idx} className="bg-card" />
        ))}
      </AnimatedListComponent>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
}
