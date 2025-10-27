import { RepoView } from "@/features/repo/views/RepoView";

interface RepoPageProps {
  params: { org: string; repo: string };
}

export default function RepoPage({ params }: RepoPageProps) {
  return <RepoView org={params.org} repo={params.repo} />;
}
