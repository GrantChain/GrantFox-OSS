"use client"

import Image from "next/image"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { cn } from "@/lib/utils"
import type { Repository } from "@/types/repositories.type"

interface CampaignRepositoryItemProps {
  repo: Repository
}

const CampaignRepositoryItem = ({ repo }: CampaignRepositoryItemProps) => {
  return (
    <div className={cn("w-full group rounded-xl p-4 border border-black/5 text-base text-white transition-all ease-in hover:cursor-pointer dark:border-white/5")}> 
      <AnimatedShinyText className="mx-0 max-w-none w-full gap-5 flex flex-col items-start justify-start px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/vercel.svg" alt="" width={50} height={50} />
            <h4 className="text-black text-lg font-medium dark:text-white">{repo.name}</h4>
          </div>
          <PulsatingButton>Add Yours</PulsatingButton>
        </div>
        <p>{repo.description}</p>
      </AnimatedShinyText>
    </div>
  )
}

export default CampaignRepositoryItem
