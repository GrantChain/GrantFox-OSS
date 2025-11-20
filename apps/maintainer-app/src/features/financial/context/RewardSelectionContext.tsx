"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AmountsByIssueId = Record<number, number>;

interface RewardSelectionContextValue {
  selectedIds: number[];
  amountsByIssueId: AmountsByIssueId;
  selectedCount: number;
  limit: number;
  canSelectMore: boolean;
  isSelected: (issueId: number) => boolean;
  toggleSelection: (issueId: number) => void;
  setAmount: (issueId: number, amount: number) => void;
  getAmount: (issueId: number) => number | undefined;
  clearAll: () => void;
}

const RewardSelectionContext = createContext<RewardSelectionContextValue | null>(null);

export const useRewardSelection = (): RewardSelectionContextValue => {
  const ctx = useContext(RewardSelectionContext);
  if (!ctx) {
    throw new Error("useRewardSelection must be used within RewardSelectionProvider");
  }
  return ctx;
};

export const RewardSelectionProvider = ({
  children,
  limit = 10,
}: {
  children: React.ReactNode;
  limit?: number;
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [amountsByIssueId, setAmountsByIssueId] = useState<AmountsByIssueId>({});

  const selectedCount = selectedIds.length;

  const isSelected = useCallback(
    (issueId: number) => selectedIds.includes(issueId),
    [selectedIds]
  );

  const canSelectMore = selectedCount < limit;

  const toggleSelection = useCallback(
    (issueId: number) => {
      setSelectedIds((prev) => {
        const already = prev.includes(issueId);
        if (already) {
          return prev.filter((id) => id !== issueId);
        }
        if (prev.length >= limit) {
          return prev;
        }
        return [...prev, issueId];
      });
    },
    [limit]
  );

  const setAmount = useCallback((issueId: number, amount: number) => {
    setAmountsByIssueId((prev) => ({ ...prev, [issueId]: amount }));
    // Auto-unselect when amount is zero or below
    if (amount <= 0) {
      setSelectedIds((prev) => prev.filter((id) => id !== issueId));
    }
  }, []);

  const getAmount = useCallback(
    (issueId: number) => amountsByIssueId[issueId],
    [amountsByIssueId]
  );

  const clearAll = useCallback(() => {
    setSelectedIds([]);
    setAmountsByIssueId({});
  }, []);

  const value = useMemo<RewardSelectionContextValue>(
    () => ({
      selectedIds,
      amountsByIssueId,
      selectedCount,
      limit,
      canSelectMore,
      isSelected,
      toggleSelection,
      setAmount,
      getAmount,
      clearAll,
    }),
    [
      selectedIds,
      amountsByIssueId,
      selectedCount,
      limit,
      canSelectMore,
      isSelected,
      toggleSelection,
      setAmount,
      getAmount,
      clearAll,
    ]
  );

  return (
    <RewardSelectionContext.Provider value={value}>
      {children}
    </RewardSelectionContext.Provider>
  );
};


