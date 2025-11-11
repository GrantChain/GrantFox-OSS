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
import { Loader2, FileIcon, InfoIcon } from "lucide-react";
import { WalletsTable } from "./WalletsTable";
import { usePaymentMethods } from "@/features/profile/hooks/usePaymentMethods";
import { z } from "zod";
import { isValidWallet } from "@/components/tw-blocks/wallet-kit/validators";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const walletSchema = z
  .string()
  .trim()
  .min(1, "Address is required")
  .refine(
    isValidWallet,
    "Invalid wallet. It must be a valid Stellar wallet address."
  );

export const ProfilePaymentMethods = () => {
  const { user } = useUser();

  const {
    wallets,
    isLoading,
    addressInput,
    setAddressInput,
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
        <CardTitle className="font-semibold flex items-center gap-2">
          Payment Methods{" "}
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              If you&apos;re both a maintainer and contributor, your wallets are
              shared across roles — but you can choose a different primary
              wallet for each app.
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your payment methods here. As a contributor, your rewards are
          sent to the wallet that&apos;s set as primary at the time the reward
          is issued — even if you change it later. Make sure your primary wallet
          is set correctly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Input
            value={addressInput}
            onChange={(e) => {
              const value = e.target.value;
              setAddressInput(value);
            }}
            placeholder="Paste your wallet address"
            className="flex-1"
            disabled={isAdding || isLoading}
          />
          <Button
            onClick={() => addWallet(addressInput)}
            disabled={
              isAdding ||
              isLoading ||
              !user?.id ||
              !walletSchema.safeParse(addressInput).success
            }
            className="shrink-0 cursor-pointer"
          >
            {isAdding ? "Adding..." : "Add wallet"}
          </Button>
        </div>

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
