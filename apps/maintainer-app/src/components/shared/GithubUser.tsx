import { cn } from "@/lib/utils"

export const GithubUserCard = ({
  img,
  name,
  username,
  body,
}: {
  img?: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-transparent hover:bg-neutral-950/[.05]",
        "dark:border-gray-50/[.1] dark:hover:bg-neutral-900/70"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}