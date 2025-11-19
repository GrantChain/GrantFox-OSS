import { useQuery } from "@tanstack/react-query";
import {
  GetEscrowsFromIndexerResponse,
  useGetEscrowFromIndexerByContractIds,
} from "@trustless-work/escrow";
import { GetEscrowsFromIndexerResponse as Escrow } from "@trustless-work/escrow/types";
/**
 * Use the query to get the escrows by contract IDs
 *
 * @param params - The parameters for the query
 * @returns The query result
 */
export const useEscrowsByContractIdsQuery = ({
  validateOnChain = true,
  contractIds,
}: {
  validateOnChain?: boolean;
  contractIds: string[];
}) => {
  // Get the escrows by contract IDs
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  return useQuery({
    queryKey: ["escrows-project-rewards", contractIds, validateOnChain],
    queryFn: async (): Promise<Escrow[]> => {
      if (!contractIds || contractIds.length === 0) {
        throw new Error(
          "Contract IDs are required to fetch escrows by contract IDs"
        );
      }

      /**
       * Call the query to get the escrows from the Trustless Work Indexer
       *
       * @param params - The parameters for the query
       * @returns The query result
       */
      const escrows = await getEscrowByContractIds({
        contractIds,
        validateOnChain,
      });

      if (!escrows) {
        throw new Error("Failed to fetch escrows");
      }

      return escrows as unknown as GetEscrowsFromIndexerResponse[];
    },
    enabled: Boolean(contractIds && contractIds.length > 0),
    staleTime: 1000 * 60 * 5,
  });
};
