import { cn } from "@/lib/utils";
import { Owner } from "@/types/github.type";
import { Maintainer } from "@/types/maintainer.type";
import { ApiUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";

/**
 * Helper function to get the username/login from either Owner or ApiUser
 */
const getUserIdentifier = (user: Owner | ApiUser | Maintainer): string => {
  if ("login" in user) {
    return user.login;
  }
  return user.username ?? "";
};

/**
 * Helper function to get the GitHub profile URL
 */
const getGitHubUrl = (user: Owner | ApiUser | Maintainer): string => {
  if ("html_url" in user && user.html_url) {
    return user.html_url;
  }

  const identifier = getUserIdentifier(user);
  return identifier ? `https://github.com/${identifier}` : "";
};

export const GithubUserCard = ({
  user,
}: {
  user: Owner | ApiUser | Maintainer;
}) => {
  const identifier = getUserIdentifier(user);
  const githubUrl = getGitHubUrl(user);

  return (
    <Link href={githubUrl} target="_blank" rel="noreferrer">
      <figure
        className={cn(
          "relative h-full w-full cursor-pointer overflow-hidden rounded-xl border px-4 py-2",
          "border-gray-950/[.1] bg-transparent hover:bg-neutral-950/[.05]",
          "dark:border-gray-50/[.1] dark:hover:bg-neutral-900/70"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <Image
            src={
              user.avatar_url ??
              "https://avatars.githubusercontent.com/u/178688063?v=4"
            }
            alt={identifier}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {identifier}
            </figcaption>
          </div>
        </div>
      </figure>
    </Link>
  );
};
