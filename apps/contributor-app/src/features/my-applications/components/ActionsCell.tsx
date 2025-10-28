"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, GithubIcon } from "lucide-react";

export type ActionsCellProps = {
  /** GitHub HTML URL of the issue */
  htmlUrl: string;
};

export const ActionsCell: React.FC<ActionsCellProps> = React.memo(
  ({ htmlUrl }) => (
    <div className="flex gap-2 justify-end">
      <Link href={htmlUrl} target="_blank" rel="noreferrer">
        <Button size="sm" variant="outline" className="cursor-pointer">
          <GithubIcon className="size-4" />
          View
          <ArrowUpRightIcon className="size-4" />
        </Button>
      </Link>
    </div>
  )
);

ActionsCell.displayName = "ActionsCell";
