"use client";

import Link from "next/link";
import { buttonStyles } from "./core/button";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary: { variant: "primary", appearance: "fill" },
  outline: { variant: "primary", appearance: "outline" },
  danger: { variant: "danger", appearance: "outline" },
  ghost: { variant: "ghost", appearance: "fill" },
};

export default function LinkButton({ href, variant = "primary", className = "", children }) {
  return (
    <Link href={href} className={cn(buttonStyles(VARIANTS[variant]), className)}>
      {children}
    </Link>
  );
}
