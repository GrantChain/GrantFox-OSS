import { IssueView } from "@/features/issue/IssueView";

interface IssuePageProps {
  params: { repo: string; number: string };
  searchParams: { org?: string };
}

export default function IssuePage({ params, searchParams }: IssuePageProps) {
  const org = searchParams.org ?? "";
  return (
    <IssueView org={org} repo={params.repo} number={Number(params.number)} />
  );
}
