"use client";

import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Hero } from "./Hero";
import { EscrowCreatedSection } from "./sections/EscrowCreatedSection";
import { LoadEscrow } from "./LoadEscrow";
import { Fund } from "./Fund";
import { Button } from "@/components/ui/button";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

type FundingViewProps = {
  contractId?: string;
};

export const FundingView = ({ contractId }: FundingViewProps) => {
  const { selectedEscrow, clearEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();

  return (
    <>
      <Hero />

      <div className="flex mb-5 mt-10 w-full justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            Fund the Projects and Maintainers!
          </h2>
          <p className="text-muted-foreground">
            By using Trustless Work escrows.
          </p>
        </div>

        {selectedEscrow && (
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={clearEscrow}
          >
            Clear Escrow
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-4 mb-4">
        <LoadEscrow contractId={contractId} />

        {selectedEscrow && walletAddress && <Fund />}
      </div>

      {selectedEscrow && !walletAddress && (
        <Card className="w-full sm:w-1/2 gap-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-orange-500" /> Connect
              Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please connect your wallet to fund the escrow.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 justify-between items-start">
        <EscrowCreatedSection />
      </div>
    </>
  );
};
