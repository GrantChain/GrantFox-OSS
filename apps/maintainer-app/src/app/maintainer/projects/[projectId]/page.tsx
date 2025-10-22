import { ProjectDetailsView } from "@/features/projects/ProjectDetailsView";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return <ProjectDetailsView projectId={projectId} />;
}
