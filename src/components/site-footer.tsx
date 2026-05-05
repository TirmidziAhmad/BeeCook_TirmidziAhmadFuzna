import Image from "next/image"
import Link from "next/link"
import type { SVGProps } from "react"

import { BrandLogo } from "@/components/brand-logo"

const partnershipLinks = [
  { href: "/partnership/layanan", label: "Layanan" },
  { href: "/partnership/kontributor", label: "Kontributor" },
  { href: "/partnership/iklan", label: "Iklan" },
  { href: "/partnership/karir", label: "Karir" },
]

const helpLinks = [
  { href: "/bantuan/faq", label: "FAQ" },
  { href: "/bantuan/kontak-kami", label: "Kontak Kami" },
  { href: "/bantuan/aksesibilitas", label: "Aksesibilitas" },
]

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 8.5V6.9c0-.8.5-1 1.1-1h2.1V2.3C16.8 2.2 15.6 2 14.4 2c-2.8 0-4.7 1.7-4.7 4.8v1.7H6.6v4h3.1V22h4.1v-9.5h3.1l.5-4H14Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        width="17"
        height="17"
        x="3.5"
        y="3.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.9 10.5 21.3 2h-1.8l-6.4 7.4L8 2H2l7.8 11.3L2 22h1.8l6.8-7.8L16 22h6l-8.1-11.5Zm-2.4 2.8-.8-1.1L4.5 3.3h2.6l5 7.1.8 1.1 6.5 9.3h-2.6l-5.3-7.5Z" />
    </svg>
  )
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      <path d="M17.64 6.72a.72.72 0 1 1-.72.72.72.72 0 0 1 .72-.72Z" />
    </svg>
  )
}

const socialLinks = [
  { href: "https://tiktok.com", label: "TikTok", icon: TikTokIcon },
  { href: "https://facebook.com", label: "Facebook", icon: FacebookIcon },
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://x.com", label: "X", icon: XIcon },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_auto] lg:px-8">
        <BrandLogo variant="white" className="[&_svg_rect]:fill-white" />

        <div>
          <h2 className="text-sm font-semibold text-white">Partnership</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {partnershipLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Bantuan</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-2 md:justify-end">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={`flex size-9 items-center justify-center bg-white text-[#111827] transition-colors hover:bg-white/85 ${label === "Facebook" || label === "Instagram" ? "rounded-full" : "rounded-lg"}`}
              target="_blank"
              rel="noreferrer"
            >
              {Icon && <Icon className="size-4" />}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 text-xs font-medium tracking-normal text-white/60 sm:px-6 lg:px-8">
        BECOOK MEDIA | ALL RIGHTS RESERVED
      </div>
    </footer>
  )
}
