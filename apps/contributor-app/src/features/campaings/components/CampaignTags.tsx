interface CampaignTagsProps {
  tags: string[] | undefined;
}

export default function CampaignTags({ tags }: CampaignTagsProps) {
  return (
    <section className="w-3xl gap-4 flex justify-start items-center mt-5">
      {tags?.map((tag) => (
        <div key={tag} className="rounded-2xl border px-4 py-2">
          {tag}
        </div>
      ))}
    </section>
  );
}
