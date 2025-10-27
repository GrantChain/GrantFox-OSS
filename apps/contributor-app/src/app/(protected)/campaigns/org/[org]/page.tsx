import { OrgView } from "@/features/org/OrgView";

interface OrgPageProps {
  params: { org: string };
}

export default function OrgPage({ params }: OrgPageProps) {
  return <OrgView org={params.org} />;
}
