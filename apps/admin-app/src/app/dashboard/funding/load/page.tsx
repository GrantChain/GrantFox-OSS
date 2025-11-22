import { FundingView } from "@/features/funding/FundingView";

type PageProps = {
  searchParams?: Promise<{
    contractId?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const rawContractId = (await searchParams)?.contractId;
  const contractId =
    typeof rawContractId === "string" ? rawContractId : undefined;

  return <FundingView contractId={contractId} />;
}
