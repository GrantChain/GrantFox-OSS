import { Badge } from "@/components/ui/badge";

interface CampaignTagsProps {
  tags: string[] | undefined;
}

export default function CampaignTags({ tags }: CampaignTagsProps) {
  return (
    <section className="w-3xl gap-4 flex justify-start items-center mt-5">
      {tags?.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </section>
  );
}
