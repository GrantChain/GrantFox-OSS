"use client";

import { Meteors } from "@/components/ui/meteors";

export function LandingView() {
  return (
    <>
      <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <Meteors number={30} />
        <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
          Welcome to GrantFox
        </span>
      </div>
      <main className="relative mx-auto min-h-[calc(100vh-56px)] w-full max-w-6xl px-4 py-10">
        <section className="relative z-10 mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          Landing View Maintainer
        </section>
      </main>
    </>
  );
}
