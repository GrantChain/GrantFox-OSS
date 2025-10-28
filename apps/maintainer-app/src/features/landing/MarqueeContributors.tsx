import { GithubUserCard } from "@/components/shared/GithubUser";
import { Marquee } from "@/components/ui/marquee";
import { ApiUser } from "@/types/user.type";

export const MarqueeContributors = ({
  contributors,
}: {
  contributors: ApiUser[];
}) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {contributors.map((contributor) => (
          <GithubUserCard key={contributor.username} user={contributor} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
};
