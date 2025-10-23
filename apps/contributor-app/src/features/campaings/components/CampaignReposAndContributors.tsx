"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import type { Campaign } from "@/types/campaign.type"
import type { ApiUser } from "@/types/user.type"
import CampaignSectionTabs from "./CampaignSectionTabs"
import CampaignRepositoriesList from "./CampaignRepositoriesList"
import CampaignContributorsGrid from "./CampaignContributorsGrid"

interface CampaignReposAndContributorsProps {
  activeCampaign: Campaign | null
  contributors: ApiUser[] | undefined
}

const CampaignReposAndContributors = ({ activeCampaign, contributors }: CampaignReposAndContributorsProps) => {
  const [sectionActive, setSectionActive] = useState({ repositories: true, contributors: false })
  const activeTab: "repositories" | "contributors" = sectionActive.repositories ? "repositories" : "contributors"

  return (
    <section className="w-full flex flex-col gap-4 justify-start items-center">
      <CampaignSectionTabs
        active={activeTab}
        onChange={(tab) => setSectionActive({ repositories: tab === "repositories", contributors: tab === "contributors" })}
      />
      <div className="relative max-h-[50rem] overflow-hidden overflow-y-auto w-full flex flex-col gap-8 rounded-2xl border-2 p-5 bg-gradient-to-b from-background/40 to-background/10">
        {activeTab === "repositories" && activeCampaign?.repositories && (
          <CampaignRepositoriesList repositories={activeCampaign.repositories} />
        )}
        {activeTab === "contributors" && contributors && (
          <CampaignContributorsGrid users={contributors} />
        )}
      </div>
    </section>
  )
}

export default CampaignReposAndContributors
