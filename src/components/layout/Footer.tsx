import Link from "next/link";
import { ArrowUp, Mail, MapPin, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const helpLinks = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Lacak Pesanan", href: "#" },
];

const socials = [
  { label: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: siteConfig.socials.tiktok, icon: TikTokIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl">
              {siteConfig.name}
              <sup className="text-acid">®</sup>
            </p>
            <p className="mt-4 max-w-xs text-sm text-bone/70">{siteConfig.description}</p>
            <ul className="mt-6 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} di ${social.label}`}
                    className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors hover:border-acid hover:bg-acid hover:text-ink"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer — belanja">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-smoke">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bone/85 transition-colors hover:text-acid">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — bantuan">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-smoke">Help</h2>
            <ul className="mt-5 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-bone/85 transition-colors hover:text-acid">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-smoke">Contact</h2>
            <address className="mt-5 space-y-3 not-italic text-bone/85">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-acid">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-acid"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.whatsapp}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.address}
              </p>
            </address>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p aria-hidden className="mt-16 select-none text-center font-display text-[24vw] uppercase leading-[0.8] text-bone/[0.06] md:mt-24">
          {siteConfig.name}
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/10 py-6 text-xs text-smoke sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved. Made loud in Bandung.
          </p>
          <Link href="#top" className="inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-acid">
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}
