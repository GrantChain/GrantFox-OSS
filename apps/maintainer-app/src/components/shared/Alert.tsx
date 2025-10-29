import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Info,
} from "lucide-react";
import Link from "next/link";

export const Alert = ({
  title,
  description,
  variant = "warning",
  link,
  notFound = false,
  children,
}: {
  title: string;
  description: string;
  variant?: "warning" | "error" | "success" | "info";
  link?: string;
  notFound?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex-col gap-2 border rounded-lg transition-colors duration-200 px-4 py-2 w-full sm:w-1/2",
          variant === "warning" &&
            "bg-yellow-50 border-yellow-200 dark:border-yellow-700/50 hover:bg-yellow-100 dark:bg-yellow-900/50 dark:hover:bg-yellow-900",
          variant === "error" &&
            "bg-red-50 border-red-200 dark:border-red-700/50 hover:bg-red-100 dark:bg-red-900/50 dark:hover:bg-red-900",
          variant === "success" &&
            "bg-green-50 border-green-200 dark:border-green-700/50 hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900",
          variant === "info" &&
            "bg-blue-50 border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900"
        )}
      >
        <h4
          className={cn(
            "inline-flex items-center gap-2 text-base font-semibold",
            variant === "warning" && "text-yellow-700 dark:text-yellow-400",
            variant === "error" && "text-red-700 dark:text-red-300",
            variant === "success" && "text-green-700 dark:text-green-300",
            variant === "info" && "text-blue-700 dark:text-blue-300"
          )}
        >
          {variant === "warning" && <AlertTriangle className="size-4" />}
          {variant === "error" && <AlertCircle className="size-4" />}
          {variant === "success" && <CheckCircle className="size-4" />}
          {variant === "info" && <Info className="size-4" />}
          {title}
          {link && (
            <Link
              href={link}
              className="text-xs text-blue-700 dark:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                className={cn(
                  "size-4 hover:size-4.5 duration-75",
                  variant === "warning" &&
                    "text-yellow-700 dark:text-yellow-400",
                  variant === "error" && "text-red-700 dark:text-red-300",
                  variant === "success" && "text-green-700 dark:text-green-300",
                  variant === "info" && "text-blue-700 dark:text-blue-300"
                )}
              />
            </Link>
          )}
        </h4>
        <p
          className={cn(
            "text-xs leading-relaxed",
            variant === "warning" && "text-yellow-900 dark:text-yellow-100",
            variant === "error" && "text-red-900 dark:text-red-100",
            variant === "success" && "text-green-900 dark:text-green-100",
            variant === "info" && "text-blue-900 dark:text-blue-100"
          )}
        >
          {description}
        </p>
      </div>
      {notFound && children}
    </div>
  );
};
