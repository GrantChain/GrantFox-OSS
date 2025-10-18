import { useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { handleError, WalletError } from "../handle-errors/handle";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow";
import { useEscrowContext } from "../providers/EscrowProvider";

export const formSchema = z.object({
  contractIds: z
    .array(
      z.object({
        value: z.string().min(1, "Contract ID is required"),
      })
    )
    .min(1, "At least one contract ID is required"),
});

export const useGetEscrowsByContractIdsForm = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] =
    useState<GetEscrowsFromIndexerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();
  const { setSelectedEscrow } = useEscrowContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractIds: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contractIds",
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const escrowData = await getEscrowByContractIds({
        contractIds: payload.contractIds.map((item) => item.value),
        validateOnChain: true,
      });

      if (!escrowData) {
        throw new Error("No escrow data received");
      }

      setResponse(escrowData);
      setSelectedEscrow(escrowData[0]);
      toast.success("Escrow data fetched successfully");
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error fetching escrow:", mappedError.message);
      setError(mappedError.message);
      toast.error(
        mappedError ? mappedError.message : "Failed to fetch escrow data"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit, fields, append, remove };
};
