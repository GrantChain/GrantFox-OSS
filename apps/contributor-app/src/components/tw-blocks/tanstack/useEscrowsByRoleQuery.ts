import { useQuery } from "@tanstack/react-query";
import {
  GetEscrowsFromIndexerByRoleParams,
  useGetEscrowsFromIndexerByRole,
} from "@trustless-work/escrow";
import { GetEscrowsFromIndexerResponse as Escrow } from "@trustless-work/escrow/types";

type UseEscrowsByRoleQueryParams = Omit<
  GetEscrowsFromIndexerByRoleParams,
  "role" | "engagementId" | "validateOnChain"
> & {
  role?: GetEscrowsFromIndexerByRoleParams["role"];
  enabled?: boolean;
};

/**
 * Use the query to get the escrows by role.
 *
 * Engagement is always taken from NEXT_PUBLIC_ENGAGEMENT
 * and validateOnChain is always enforced to true.
 */
export const useEscrowsByRoleQuery = ({
  role,
  roleAddress,
  isActive = true,
  page,
  orderDirection,
  orderBy,
  startDate,
  endDate,
  maxAmount,
  minAmount,
  title,
  status,
  type,
  enabled = true,
}: UseEscrowsByRoleQueryParams) => {
  // Get the escrows by role
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

  const engagementId = process.env.NEXT_PUBLIC_ENGAGEMENT;
  const validateOnChain = true as const;

  return useQuery({
    queryKey: [
      "escrows",
      roleAddress,
      role,
      isActive,
      page,
      orderDirection,
      orderBy,
      startDate,
      endDate,
      maxAmount,
      minAmount,
      title,
      engagementId,
      status,
      type,
      validateOnChain,
    ],
    queryFn: async (): Promise<Escrow[]> => {
      if (!role) {
        throw new Error("Role is required to fetch escrows by role");
      }

      /**
       * Call the query to get the escrows from the Trustless Work Indexer.
       */
      const escrows = await getEscrowsByRole({
        role,
        roleAddress,
        isActive,
        page,
        orderDirection,
        orderBy,
        startDate,
        endDate,
        maxAmount,
        minAmount,
        title,
        engagementId,
        status,
        type,
        validateOnChain,
      });

      if (!escrows) {
        throw new Error("Failed to fetch escrows");
      }

      return escrows;
    },
    enabled: enabled && !!roleAddress && !!role && !!engagementId,
    staleTime: 1000 * 60 * 5,
  });
};
