import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisteredRepositories, Repositories } from "./Repositories";

type RepositoriesCombinedProps = {
  orgLogin?: string;
  projectId?: string;
};

export const RepositoriesCombined: React.FC<RepositoriesCombinedProps> = ({
  orgLogin,
  projectId,
}) => {
  if (!projectId) return null;

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex mb-4">
        <TabsList className="w-auto flex justify-start items-center gap-3 border-b-0 pb-0">
          <TabsTrigger value="all" className="cursor-pointer">
            All
          </TabsTrigger>
          <TabsTrigger value="registered" className="cursor-pointer">
            Registered
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all" className="mt-0">
        <Repositories orgLogin={orgLogin} projectId={projectId} />
      </TabsContent>
      <TabsContent value="registered" className="mt-0">
        <RegisteredRepositories projectId={projectId} />
      </TabsContent>
    </Tabs>
  );
};
