"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@/types/campaign.type";

interface CampaignHeaderProps {
  campaign: Campaign;
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      {campaign.image_url && (
        <Image
          width={80}
          height={80}
          src={campaign.image_url || "/placeholder.svg"}
          alt={campaign.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
      )}
      <div className="flex-1 space-y-2">
        <h1 className="text-3xl font-bold">{campaign.name}</h1>
        <p className="text-base text-muted-foreground">{campaign.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          {campaign.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <Badge variant="outline">{campaign.status}</Badge>
        </div>
      </div>
    </div>
  );
}

