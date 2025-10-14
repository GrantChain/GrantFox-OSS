import { IssueView } from "@/features/issue/views/IssueView";

interface IssuePageProps {
  params: { org: string; repo: string; number: string };
}

export default function IssuePage({ params }: IssuePageProps) {
  return (
    <IssueView
      org={params.org}
      repo={params.repo}
      number={Number(params.number)}
    />
  );
}
