import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadEscrowForm } from "./LoadEscrowForm";

export const LoadEscrow = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Load Escrow by Contract ID</CardTitle>
        <CardDescription>
          Paste a contract ID and load its escrow information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoadEscrowForm />
      </CardContent>
    </Card>
  );
};
