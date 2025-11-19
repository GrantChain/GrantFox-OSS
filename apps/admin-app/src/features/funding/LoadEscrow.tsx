import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadEscrowForm } from "./LoadEscrowForm";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";

type LoadEscrowProps = {
  contractId?: string;
};

export const LoadEscrow = ({ contractId }: LoadEscrowProps) => {
  const { selectedEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  return (
    <Card
      className={`${selectedEscrow && walletAddress ? "w-full sm:w-3/4" : "w-full "}`}
    >
      <CardHeader>
        <CardTitle>Load Escrow by Contract ID</CardTitle>
        <CardDescription>
          Paste a contract ID and load its escrow information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoadEscrowForm initialContractId={contractId} />
      </CardContent>
    </Card>
  );
};
