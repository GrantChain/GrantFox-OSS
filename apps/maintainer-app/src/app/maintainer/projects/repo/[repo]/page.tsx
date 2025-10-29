import { RepoView } from "@/features/repositories/RepoView";

interface RepoPageProps {
  params: { repo: string; org?: string };
  searchParams?: { org?: string };
}

export default function RepoPage({ params, searchParams }: RepoPageProps) {
  const org = params.org ?? searchParams?.org ?? "";
  return <RepoView org={org} repo={params.repo} />;
}
