import { Alert } from "@/components/shared/Alert";

export const SelectionLimitAlert = ({
  limitReached,
  limit,
}: {
  limitReached: boolean;
  limit: number;
}) => {
  if (!limitReached) return null;
  return (
    <div className="mt-2">
      <Alert
        variant="warning"
        title="Selection limit reached"
        description={`You can select up to ${limit} issues. Deselect one to choose another.`}
      />
    </div>
  );
};


