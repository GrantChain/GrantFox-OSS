"use client";
import { useEffect, useState } from "react";
import { LoaderCard } from "@/components/ui/loader";
import {
  useGitHubRepo,
  useGitHubRepoIssues,
} from "@/features/github/hooks/useGitHubRepos";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { Back } from "@/components/shared/Back";
import type { Issue } from "@/types/Github";
import { useCampaignContext } from "@/context/CampaignContext";
import { IssueCard } from "@/components/shared/IssueCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RepoAside } from "../RepoAside";
import { RepoHeader } from "../RepoHeader";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownRehypePlugins } from "@/lib/markdown";

export const RepoView = ({ org, repo }: { org: string; repo: string }) => {
  const { activeCampaign } = useCampaignContext();
  const campaignLabel = activeCampaign?.name || undefined;
  const {
    data,
    isLoading: repoLoading,
    isError: repoError,
  } = useGitHubRepo(org, repo);
  const { data: issues, isLoading: issuesLoading } = useGitHubRepoIssues(
    org,
    repo,
    {
      per_page: 30,
      state: "open",
      labels: campaignLabel,
    }
  );

  const [readme, setReadme] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);

  useEffect(() => {
    const fetchReadme = async () => {
      if (!data) return;
      setReadmeLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/${org}/${repo}/readme`,
          {
            headers: {
              Accept: "application/vnd.github.v3.raw",
            },
          }
        );
        if (response.ok) {
          const content = await response.text();
          setReadme(content);
        }
      } catch (error) {
        console.error("Failed to fetch README:", error);
      } finally {
        setReadmeLoading(false);
      }
    };

    fetchReadme();
  }, [org, repo, data]);

  if (repoLoading) {
    return (
      <main className="relative mx-auto w-full max-w-7xl px-4 py-10">
        <section className="relative z-10 flex justify-center">
          <LoaderCard
            title="Loading repository…"
            subtitle="Fetching repository details and open issues."
          />
        </section>
      </main>
    );
  }

  if (repoError || !data) {
    return (
      <main className="relative mx-auto w-full max-w-7xl px-4 py-10">
        <section className="relative z-10">
          <h1 className="text-3xl font-semibold">Repository not found</h1>
          <p className="text-muted-foreground">
            Please check the URL or try again.
          </p>
        </section>
      </main>
    );
  }

  const campaignIssues = campaignLabel
    ? ((issuesLoading ? [] : issues) ?? []).filter((issue: Issue) =>
        (issue.labels ?? []).some((l) => l.name === campaignLabel)
      )
    : [];

  return (
    <main className="relative min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Back />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <RepoAside repo={data} org={org} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold">Repository Information</h1>

              <p className="text-muted-foreground mt-2">
                Check out the repository and join in by contributing to the
                issues.
              </p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="readme" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="readme">README</TabsTrigger>
                <TabsTrigger value="issues">
                  Issues ({campaignIssues.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Issues</CardTitle>
                    <CardDescription>
                      {campaignLabel
                        ? `Issues labeled with "${campaignLabel}"`
                        : "Select an active campaign to view labeled issues"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {campaignLabel && campaignIssues.length === 0 && (
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <Ban />
                            </EmptyMedia>
                            <EmptyTitle>No campaign issues</EmptyTitle>
                            <EmptyDescription>{`No issues found with label ${campaignLabel}.`}</EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      )}

                      {campaignIssues.map((issue: Issue) => (
                        <IssueCard
                          key={issue.id}
                          org={org}
                          repo={repo}
                          issue={issue}
                        />
                      ))}

                      {!campaignLabel && (
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <Ban />
                            </EmptyMedia>
                            <EmptyTitle>No active campaign</EmptyTitle>
                            <EmptyDescription>
                              Select an active campaign to view labeled issues.
                            </EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="readme" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image
                        alt="README"
                        src="/tech/github-dark.svg"
                        width={100}
                        height={100}
                        className="w-4 h-4 block dark:hidden"
                      />
                      <Image
                        alt="README"
                        src="/tech/github-light.svg"
                        width={100}
                        height={100}
                        className="w-4 h-4 hidden dark:block"
                      />
                      README
                    </CardTitle>
                    <CardDescription>
                      Project documentation and overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {readmeLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <LoaderCard
                          title="Loading README…"
                          subtitle="Fetching project documentation."
                        />
                      </div>
                    ) : readme ? (
                      <div className="prose prose-invert max-w-none text-foreground whitespace-pre-wrap break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={markdownRehypePlugins}
                        >
                          {readme ?? "No README found"}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Ban />
                          </EmptyMedia>
                          <EmptyTitle>No README found</EmptyTitle>
                          <EmptyDescription>
                            This repository doesn't have a README file.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};
