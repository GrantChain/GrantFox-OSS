import React from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { Loader2, FileIcon } from "lucide-react";
import { WalletsTable } from "./WalletsTable";
import { usePaymentMethods } from "@/features/profile/hooks/usePaymentMethods";

export const ProfilePaymentMethods = () => {
  const { user } = useUser();

  const {
    wallets,
    isLoading,
    addressInput,
    setAddressInput,
    error,
    isAdding,
    addWallet,
  } = usePaymentMethods(user?.id);

  return (
    <Card className="relative overflow-hidden group w-full md:w-3/4">
      <ShineBorder
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        borderWidth={2}
        shineColor={["#9c40ff", "#ffaa40", "#22d3ee"]}
      />
      <CardHeader>
        <CardTitle className="font-semibold">Payment Methods</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your payment methods here.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Input
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Paste your wallet address"
            className="flex-1"
            disabled={isAdding || isLoading}
          />
          <Button
            onClick={() => addWallet(addressInput)}
            disabled={isAdding || isLoading || !user?.id}
            className="shrink-0"
          >
            {isAdding ? "Adding..." : "Add wallet"}
          </Button>
        </div>
        {error ? (
          <p className="text-sm text-destructive mt-2" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-4">
          {isLoading ? (
            <div className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
              <Loader2 className="size-10 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Loading wallets...
              </span>
            </div>
          ) : wallets && wallets.length > 0 ? (
            <WalletsTable wallets={wallets} />
          ) : (
            <div className="p-4 flex items-center gap-2 text-sm flex-col w-full h-full justify-center">
              <FileIcon className="size-10" />
              <span className="text-sm text-muted-foreground">
                No wallets found
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


