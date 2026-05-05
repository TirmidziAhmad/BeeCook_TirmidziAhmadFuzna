"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/resep", label: "Resep" },
  { href: "/kelola", label: "Kelola" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur font-[family-name:var(--font-inter)] font-semibold mt-10 ">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <nav className="flex items-center gap-12" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  isActive && "text-[#E8B431] hover:text-[#E8B431]",
                  "min-w-18 text-[24px]",
                )}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
