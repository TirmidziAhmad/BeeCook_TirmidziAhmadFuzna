import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  variant?: "default" | "white";
};

export function BrandLogo({ className, variant = "default" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Beecook home"
    >
      <Image
        src={variant === "white" ? "/images/logo-beecook-white.png" : "/logo.png"}
        alt="Beecook Logo"
        width={186}
        height={47}
        className="object-contain"
        priority
      />
    </Link>
  );
}
