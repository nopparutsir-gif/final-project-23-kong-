import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const checkboxStyles = cva(
  "shrink-0 rounded border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]/30 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

type CheckboxProps = Omit<ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof checkboxStyles>;

export function Checkbox({ className, size, style, ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      style={{ ...style, accentColor: "#4338CA", color: "#4338CA" }}
      className={cn(checkboxStyles({ size }), className)}
    />
  );
}
