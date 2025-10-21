"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export function SignInView() {
  const { signInWithGitHub } = useUser();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-md items-center px-4 py-10">
      <div className="relative w-full overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
        <BorderBeam borderWidth={2} size={120} />
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in or create an account using GitHub.
          </p>

          <div className="mt-6 grid gap-3">
            <Button
              className="w-full cursor-pointer"
              onClick={signInWithGitHub}
            >
              Continue with GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
