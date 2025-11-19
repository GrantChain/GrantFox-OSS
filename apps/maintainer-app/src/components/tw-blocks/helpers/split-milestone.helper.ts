export function splitMilestoneDescription(
  description: string,
  type: "title" | "repository" | "issueLink" | "prLink"
) {
  const parts = description.split("&");

  const map: Record<string, string> = {
    title: parts[0] ?? "",
    repository: parts[1] ?? "",
    issueLink: parts[2] ?? "",
    prLink: parts[3] ?? "",
  };

  return map[type as string] ?? null;
}
