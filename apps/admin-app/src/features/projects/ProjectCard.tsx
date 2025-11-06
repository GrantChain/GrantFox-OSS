import { MaintainerCard } from "../maintainers/MaintainerCard";
import { RepositoryCard } from "../repositories/RepositoryCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { CampaignProject } from "@/types/campaign.type";
import Image from "next/image";
import Link from "next/link";

export const ProjectCard = ({ project }: { project: CampaignProject }) => {
  return (
    <Card key={project.project_id} className="p-6">
      {/* Project Header */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`https://contribute.grantfox.xyz/campaigns/org/${project.github_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0"
          >
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={`https://github.com/${project.github_handle}.png`}
                alt={project.name}
                width={100}
                height={100}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-xl font-semibold hover:underline">
                {project.name}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              @{project.github_handle}
            </p>
          </Link>
          <Badge variant="outline">{project.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Project Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintainers Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            Maintainers
            <Badge variant="outline" className="text-xs">
              {project.maintainers.length}
            </Badge>
          </h4>
          <div className="space-y-2">
            {project.maintainers.map((maintainer) => (
              <MaintainerCard
                key={maintainer.user_id}
                maintainer={{
                  ...maintainer,
                  email: "tets@test.com",
                  joined_at: "2021-01-01",
                }}
              />
            ))}
          </div>
        </div>

        {/* Repositories Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            Repositories
            <Badge variant="outline" className="text-xs">
              {project.repositories.length}
            </Badge>
          </h4>
          <div className="space-y-2">
            {project.repositories.map((repository) => (
              <RepositoryCard
                key={repository.github_repo_id}
                repository={repository}
                rightExtra={
                  <span className="text-xs text-muted-foreground">
                    Added {formatDate(repository.added_to_campaign_at ?? "")}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
