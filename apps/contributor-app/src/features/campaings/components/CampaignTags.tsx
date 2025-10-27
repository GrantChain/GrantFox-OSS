import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface CampaignTagsProps {
  tags: string[] | undefined;
}

export default function CampaignTags({ tags }: CampaignTagsProps) {
  return (
    <section className="w-full gap-4 flex justify-between items-center mt-5">
      {tags?.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}

      <Link href="https://stellar.org" target="_blank">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-bold">
            Backed by
          </span>

          <Image
            src={"/tech/stellar-dark.svg"}
            className="block dark:hidden"
            alt="GrantFox Stellar"
            width={30}
            height={30}
          />
          <Image
            src={"/tech/stellar-light.svg"}
            className="hidden dark:block"
            alt="GrantFox Stellar Light"
            width={30}
            height={30}
          />
        </div>
      </Link>
    </section>
  );
}
