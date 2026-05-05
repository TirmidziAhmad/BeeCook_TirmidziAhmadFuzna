"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur font-[family-name:var(--font-inter)] font-semibold mt-0 md:mt-10">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12" aria-label="Main navigation">
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

        {/* Mobile Hamburger Toggle */}
        <button
          className="flex items-center justify-center p-2 md:hidden text-[#111827]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-5 md:hidden bg-background",
          !isOpen && "hidden"
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md p-4 text-center">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex w-full items-center justify-center rounded-md p-2 text-2xl font-semibold hover:text-[#E8B431]",
                  isActive ? "text-[#E8B431]" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}