import { CampaignDetailsView } from "@/features/campaigns/CampaignDetailsView";

export default async function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <CampaignDetailsView campaignId={campaignId} />;
}
