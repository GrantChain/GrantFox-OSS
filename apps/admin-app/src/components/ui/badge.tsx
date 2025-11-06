import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "inline-flex items-center gap-2 text-xs text-primary-700 dark:text-primary-300 bg-primary-50 border border-primary-200 dark:border-primary-700/50 rounded-lg hover:bg-primary-50 dark:bg-primary-900/50 dark:hover:bg-primary-900 transition-colors duration-200",
        destructive:
          "inline-flex items-center gap-2 text-xs text-red-700 dark:text-red-300 bg-red-50 border border-red-200 dark:border-red-700/50 rounded-lg hover:bg-red-100 dark:bg-red-900/50 dark:hover:bg-red-900 transition-colors duration-200",
        success:
          "inline-flex items-center gap-2 text-xs text-green-700 dark:text-green-300 bg-green-50 border border-green-200 dark:border-green-700/50 rounded-lg hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900 transition-colors duration-200",
        warning:
          "inline-flex items-center gap-2 text-xs text-yellow-700 dark:text-yellow-400 bg-yellow-50 border border-yellow-200 dark:border-yellow-700/50 rounded-lg hover:bg-yellow-100 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 transition-colors duration-200",
        secondary:
          "inline-flex items-center gap-2 text-xs border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "inline-flex items-center gap-2 text-xs  text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
