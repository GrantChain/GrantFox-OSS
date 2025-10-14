import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Back = () => {
  const router = useRouter();

  return (
    <div className="mb-4">
      <Button
        className="cursor-pointer"
        variant="outline"
        size="sm"
        onClick={() => router.back()}
      >
        <span className="me-2">
          <ArrowLeft />
        </span>{" "}
        Back
      </Button>
    </div>
  );
};
