"use client";

import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Wallet } from "@/types/wallets.type";
import { AuthService } from "@/features/auth/services/auth.service";
import { http } from "@/lib/api";
import { toast } from "sonner";

type UsePaymentMethodsReturn = {
  wallets: Wallet[];
  isLoading: boolean;
  addressInput: string;
  setAddressInput: (value: string) => void;
  error: string | null;
  setError: (value: string | null) => void;
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

  const { data: wallets = [], isLoading } = useQuery<Wallet[]>({
    queryKey: ["wallets", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) return [];
      const apiUser = await authService.getUser(userId);
      return apiUser?.wallets ?? [];
    },
  });

  const [addressInput, setAddressInput] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = React.useState<boolean>(false);

  const addWallet = React.useCallback(
    async (rawAddress: string) => {
      if (!userId) return;
      const address = rawAddress.trim();
      if (address.length === 0) {
        setError("Address is required");
        return;
      }

      setIsAdding(true);
      setError(null);
      try {
        const validation = await authService.walletExists(address);
        if (validation.exists) {
          setError("Wallet already exists");
          toast.error("La wallet ya existe");
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
        toast.success("Wallet agregada correctamente");
      } catch {
        setError("Failed to add wallet");
        toast.error("No se pudo agregar la wallet");
      } finally {
        setIsAdding(false);
      }
    },
    [userId, authService, queryClient, wallets.length]
  );

  return {
    wallets,
    isLoading,
    addressInput,
    setAddressInput,
    error,
    setError,
    isAdding,
    addWallet,
  };
}
