import { FundEscrowForm } from "@/components/tw-blocks/escrows/single-multi-release/fund-escrow/form/FundEscrow";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Fund = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Load Escrow by Contract ID</CardTitle>
        <CardDescription>
          Paste a contract ID and load its escrow information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FundEscrowForm />
      </CardContent>
    </Card>
  );
};
