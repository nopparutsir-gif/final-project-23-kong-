import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("cursor-pointer text-sm text-slate-700", className)}
      {...props}
    />
  );
}
