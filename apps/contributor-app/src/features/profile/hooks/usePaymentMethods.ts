"use client";

import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Wallet } from "@/types/wallets.type";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

type UsePaymentMethodsReturn = {
  wallets: Wallet[];
  isLoading: boolean;
  addressInput: string;
  setAddressInput: (value: string) => void;
  isAdding: boolean;
  addWallet: (rawAddress: string) => Promise<void>;
};

export function usePaymentMethods(
  userId?: string,
  providedService?: AuthService
): UsePaymentMethodsReturn {
  const authService = React.useMemo(
    () => providedService ?? new AuthService(http),
    [providedService]
  );
  const queryClient = useQueryClient();
  const { refreshApiUser } = useUser();

  const { data: wallets = [], isLoading } = useQuery<Wallet[]>({
    queryKey: ["wallets", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) return [];
      return await authService.getWallets(userId);
    },
  });

  const [addressInput, setAddressInput] = React.useState<string>("");
  const [isAdding, setIsAdding] = React.useState<boolean>(false);

  const addWallet = React.useCallback(
    async (rawAddress: string) => {
      if (!userId) return;
      const address = rawAddress.trim();

      setIsAdding(true);
      try {
        const validation = await authService.walletExists(address, userId);

        if (!validation.canUse) {
          toast.error(validation.reason);
          return;
        }

        const shouldBePrimary = wallets.length === 0;
        const created = await authService.addWallet(
          userId,
          validation.address,
          shouldBePrimary
        );

        queryClient.setQueryData<Wallet[]>(
          ["wallets", userId],
          (prevWallets = []) => {
            const updatedPrev = created.is_primary
              ? prevWallets.map((w) => ({ ...w, is_primary: false }))
              : prevWallets;
            const next = [...updatedPrev, created];
            return next.sort((a, b) =>
              a.is_primary === b.is_primary ? 0 : a.is_primary ? -1 : 1
            );
          }
        );
        setAddressInput("");
        await refreshApiUser();
        toast.success("Wallet added successfully");
      } catch {
        toast.error("Failed to add wallet");
      } finally {
        setIsAdding(false);
      }
    },
    [userId, authService, queryClient, wallets.length, refreshApiUser]
  );

  return {
    wallets,
    isLoading,
    addressInput,
    setAddressInput,
    isAdding,
    addWallet,
  };
}
