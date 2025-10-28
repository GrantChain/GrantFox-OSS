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

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownRehypePlugins } from "@/lib/markdown";
import { RepoAside } from "./RepoAside";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    }
  );

  const [readme, setReadme] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [activeOnly, setActiveOnly] = useState<boolean>(Boolean(campaignLabel));

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

  useEffect(() => {
    setActiveOnly(Boolean(campaignLabel));
  }, [campaignLabel]);

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

  const allIssues: Issue[] = ((issuesLoading ? [] : issues) ?? []) as Issue[];
  const issuesOnly: Issue[] = allIssues.filter(
    (it: unknown) => !(it as Record<string, unknown>)?.["pull_request"]
  );

  const availableLabels: string[] = Array.from(
    new Set(
      issuesOnly
        .flatMap((iss) => (Array.isArray(iss.labels) ? iss.labels : []))
        .map((l) => l.name)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const filteredIssues: Issue[] = issuesOnly.filter((issue) => {
    // Filter by active campaign label if enabled and available
    if (activeOnly && campaignLabel) {
      const hasCampaign = (issue.labels ?? []).some(
        (l) => l.name === campaignLabel
      );
      if (!hasCampaign) return false;
    }
    // Filter by selected labels (OR match)
    if (selectedLabels.length > 0) {
      const names = new Set((issue.labels ?? []).map((l) => l.name));
      if (![...selectedLabels].some((l) => names.has(l))) return false;
    }
    return true;
  });

  return (
    <main className="relative">
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
                Issues ({filteredIssues.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="issues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Issues</CardTitle>
                  <CardDescription>
                    {activeOnly && campaignLabel
                      ? `Filtered by active campaign: "${campaignLabel}"`
                      : "Browse and filter open issues"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            Labels ({selectedLabels.length})
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-64">
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">
                              Select labels
                            </div>
                            <div className="max-h-56 overflow-auto pr-1 space-y-2">
                              {availableLabels.length === 0 ? (
                                <div className="text-xs text-muted-foreground">
                                  No labels found
                                </div>
                              ) : (
                                availableLabels.map((lbl) => {
                                  const checked = selectedLabels.includes(lbl);
                                  const inputId = `lbl-${lbl.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
                                  return (
                                    <div
                                      key={lbl}
                                      className="flex items-center gap-2"
                                    >
                                      <Checkbox
                                        id={inputId}
                                        checked={checked}
                                        onCheckedChange={(v) => {
                                          const isChecked = v === true;
                                          setSelectedLabels((prev) =>
                                            isChecked
                                              ? prev.includes(lbl)
                                                ? prev
                                                : [...prev, lbl]
                                              : prev.filter((x) => x !== lbl)
                                          );
                                        }}
                                      />
                                      <Label htmlFor={inputId}>{lbl}</Label>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="active-only"
                          checked={activeOnly}
                          disabled={!campaignLabel}
                          onCheckedChange={(v) => setActiveOnly(v === true)}
                        />
                        <Label htmlFor="active-only">
                          Active campaign
                          {campaignLabel ? `: ${campaignLabel}` : " (none)"}
                        </Label>
                      </div>

                      {(selectedLabels.length > 0 || activeOnly) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLabels([]);
                            setActiveOnly(Boolean(campaignLabel));
                          }}
                        >
                          Clear filters
                        </Button>
                      )}
                    </div>

                    {/* Results */}
                    {filteredIssues.length === 0 ? (
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Ban />
                          </EmptyMedia>
                          <EmptyTitle>No issues found</EmptyTitle>
                          <EmptyDescription>
                            {availableLabels.length === 0
                              ? "This repository has no open issues."
                              : "Try adjusting or clearing the filters."}
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    ) : (
                      filteredIssues.map((issue: Issue) => (
                        <IssueCard
                          key={issue.id}
                          org={org}
                          repo={repo}
                          issue={issue}
                        />
                      ))
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
                          This repository does not have a README file.
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
    </main>
  );
};
