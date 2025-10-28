import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownRehypePlugins } from "@/lib/markdown";
import { memo } from "react";

export interface IssueDescriptionProps {
  body: string | null | undefined;
}

export const IssueDescription = memo(function IssueDescription({ body }: IssueDescriptionProps) {
  return (
    <Card className="p-6 md:p-8 border border-border bg-muted/20">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Description</h2>
        <div className="prose prose-invert max-w-none text-foreground whitespace-pre-wrap break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={markdownRehypePlugins}>
            {body ?? "No description provided"}
          </ReactMarkdown>
        </div>
      </div>
    </Card>
  );
});


