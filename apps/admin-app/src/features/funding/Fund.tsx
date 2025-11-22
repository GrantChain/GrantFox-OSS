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
    <Card className="w-full sm:w-3/12">
      <CardHeader>
        <CardTitle>Fund Escrow</CardTitle>
        <CardDescription>
          Fund an escrow by providing the amount.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FundEscrowForm />
      </CardContent>
    </Card>
  );
};
