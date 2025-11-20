import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReactNode } from "react";

export type TabDef = { name: ReactNode; value: string; content: ReactNode };

export function ProjectTabs({ tabs }: { tabs: TabDef[] }) {
  return (
    <Tabs defaultValue="repositories" className="gap-4">
      <TabsList className="bg-background rounded-none border-b p-0 sm:gap-4 flex w-full justify-center">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none cursor-pointer"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}


