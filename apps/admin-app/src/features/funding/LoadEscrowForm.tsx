import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetEscrowsByContractIdsForm } from "@/components/tw-blocks/tanstack/useEscrowsByContractIds.hook";

export const LoadEscrowForm = () => {
  const { form, loading, error, onSubmit } = useGetEscrowsByContractIdsForm();
  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          onSubmit={form.handleSubmit(async (values) => {
            await onSubmit(values);
          })}
        >
          <FormField
            control={form.control}
            name={"contractIds.0.value" as never}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contract ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter contract ID"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? "Loading…" : "Load"}
            </Button>
          </div>
        </form>
      </Form>
      {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
    </>
  );
};
