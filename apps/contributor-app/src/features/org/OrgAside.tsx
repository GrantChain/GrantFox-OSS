"use client";

import { Card } from "@/components/ui/card";
import type { Project } from "@/types/project.type";
import { Badge } from "@/components/ui/badge";
import { GithubUserCard } from "@/components/shared/GithubUserCard";

interface OrgAsideProps {
  project: Project;
}

export const OrgAside = ({ project }: OrgAsideProps) => {
  return (
    <div className="space-y-4">
      {/* Maintainers */}
      <Card className="p-4 gap-2">
        <h3 className="font-semibold">Maintainers</h3>
        <div className="flex flex-col gap-2">
          {project.maintainers.map((maintainer) => (
            <GithubUserCard key={maintainer.user_id} user={maintainer} />
          ))}
        </div>
      </Card>

      {/* Tech Stack */}
      {project.tech_stack.length > 0 && (
        <Card className="p-4 gap-2">
          <h3 className="font-semibold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
