import { CampaignCard } from "./CampaignCard";
import { Hero } from "./Hero";
import { Campaign } from "@/types/campaign.type";

const campaigns: Campaign[] = [
  {
    title: "Campaign 1",
    description: "Description 1",
    image:
      "https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto",
  },

  {
    title: "Campaign 3",
    description: "Description 3",
    image:
      "https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto",
  },

  {
    title: "Campaign 5",
    description: "Description 5",
    image:
      "https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto",
  },

  {
    title: "Campaign 6",
    description: "Description 6",
    image:
      "https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto",
  },
];

export const CampaignsView = () => {
  return (
    <>
      <Hero />

      <div className="flex flex-col gap-2 mb-5">
        <h2 className="text-2xl font-bold">Featured Campaigns</h2>
        <p className="text-muted-foreground">
          Manage your campaigns to the OSS community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.title} campaign={campaign} />
        ))}
      </div>
    </>
  );
};
