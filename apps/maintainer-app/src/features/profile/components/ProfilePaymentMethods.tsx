import React from "react";
import { useUser } from "@/context/UserContext";
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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export const ProfilePaymentMethods = () => {
  const { user } = useUser();
  // const { walletAddress } = useWalletContext();

  const { wallets, isLoading, isAdding, addWallet } = usePaymentMethods(
    user?.id
  );

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
          Manage your payment methods here. As a maintainer, your rewards are
          sent to the wallet that&apos;s set as primary at the time the reward
          is issued — even if you change it later. You&apos;ll also need your
          primary wallet to sign contributor rewards, so make sure it&apos;s set
          correctly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:items-center">
          <WalletButton
            onConnected={(address) => {
              if (!user?.id || isAdding || isLoading) return;
              void addWallet(address);
            }}
          />

          {/* {!walletAddress && (
            <Alert
              title="No wallet connected"
              description="Connect your wallet to add payment methods"
              variant="warning"
            />
          )} */}
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
