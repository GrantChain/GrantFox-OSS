import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";
import vercel from "*.svg"
import { mockRepositories } from "./mock/repositories";
import Image from "next/image";

export default function CampaignPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="relative flex flex-col gap-28 rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
          width={20}
          height={20}
          squares={[80, 80]}
          squaresClassName="hover:fill-gray-500"
        />
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold">Compaign #1</h1>
          <PulsatingButton>Register</PulsatingButton>
        </div>
        <div className="w-full flex justify-between items-center">
          <TextAnimate animation="blurIn" as="span" className="w-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti,
            eveniet? Repellendus nesciunt fugit laudantium minima unde.
          </TextAnimate>
          <div className="w-full flex justify-end items-center gap-5">
            <div className="p-2 flex flex-col justify-center items-center">
              <NumberTicker
                value={32}
                className="text-5xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-2xl font-medium block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                Repositories
              </span>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <NumberTicker
                value={123}
                className="text-5xl font-bold tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-2xl font-medium block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                Contributors
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-3xl gap-4 flex justify-start items-center mt-5">
        <div className="rounded-2xl border px-4 py-2">Stellar</div>
        <div className="rounded-2xl border px-4 py-2">Rust</div>
        <div className="rounded-2xl border px-4 py-2">Next</div>
      </section>

      <section className="w-auto py-32 gap-3 flex justify-start items-center">
        <h1 className="text-6xl font-bold">Starts In:</h1>
        <div className="flex gap-1">
          <NumberTicker
            value={10}
            className="text-6xl tracking-tighter whitespace-pre-wrap text-black dark:text-white"
          />
          <h3 className="text-6xl text-orange-500">Days</h3>
        </div>
        <div className="flex gap-1">
          <NumberTicker
            value={9}
            className="text-6xl tracking-tighter whitespace-pre-wrap text-black dark:text-white"
          />
          <h3 className="text-6xl text-orange-500">Hours</h3>
        </div>
      </section>

      <section className="w-full flex flex-col gap-4 justify-start items-center">
        <div className="w-full flex justify-start items-center gap-3">
          <button className=" cursor-pointer border-b-2 border-orange-500 p-2">
            Repositories
          </button>
          |<button className="cursor-pointer p-2">Contributors</button>
        </div>
        <div className="relative w-full flex flex-col gap-8 rounded-2xl border p-5 bg-gradient-to-b from-background/40 to-background/10">
          {mockRepositories.map((repo) => (
            <div
              className={cn(
                "w-full group rounded-xl p-4 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              key={repo.github_repo_id}
            >
              <AnimatedShinyText className="w-full gap-5 flex flex-col items-start justify-start px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/vercel.svg"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <h4 className="text-white text-lg font-medium">{repo.name}</h4>
                </div>
                <p>{repo.description}</p>
              </AnimatedShinyText>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
