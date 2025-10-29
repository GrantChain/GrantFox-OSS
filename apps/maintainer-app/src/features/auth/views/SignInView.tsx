"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { BorderBeam } from "@/components/ui/border-beam";
import { GithubIcon } from "lucide-react";

export function SignInView() {
  const { signInWithGitHub } = useUser();

  return (
    <Card className="relative w-full max-w-md overflow-hidden border shadow-lg mt-10 sm:mt-30 mx-auto bg-transparent">
      <BorderBeam borderWidth={2} size={120} />
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in or create an account using GitHub
          </p>
        </div>

        {/* GitHub Button */}
        <Button
          onClick={signInWithGitHub}
          className="w-full h-11 font-medium cursor-pointer"
          size="lg"
        >
          <GithubIcon className="w-4 h-4" />
          Continue with GitHub
        </Button>
      </div>
    </Card>
  );
}
