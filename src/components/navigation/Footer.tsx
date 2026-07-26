import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BusinessHours } from "@/types/site";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  mapsUrl?: string;
}

interface FooterProps {
  logo?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  contact?: ContactInfo;
  businessHours?: BusinessHours[];
  copyright?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function Footer({
  logo,
  description,
  columns,
  socialLinks,
  copyright,
  contact,
  businessHours,
  variant = "default",
  className,
}: FooterProps) {
  const footerColumns = columns ?? [];
  const footerSocialLinks = socialLinks ?? [];
  return (
    <footer
      className={cn(
        "border-t transition-colors duration-300",
        variant === "dark"
          ? "border-gold-500/10 bg-surface-dark text-text-inverse"
          : "border-gold-500/5 bg-surface text-text",
        className,
      )}
    >
      <div className="container-site py-20 lg:py-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {logo && <div className="mb-6">{logo}</div>}
            {description && (
              <p
                className={cn(
                  "text-body-sm leading-relaxed max-w-sm",
                  variant === "dark"
                    ? "text-text-muted"
                    : "text-text-secondary",
                )}
              >
                {description}
              </p>
            )}
            {footerSocialLinks && footerSocialLinks.length > 0 && (
              <div className="mt-8 flex items-center gap-5">
                {footerSocialLinks.map((link) => (
                  <Link
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-caption tracking-[0.12em] font-medium transition-all duration-300 uppercase",
                      variant === "dark"
                        ? "text-text-muted hover:text-gold-300"
                        : "text-text-tertiary hover:text-gold-600",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2 lg:col-start-auto">
                <h3 className="mb-6 text-overline tracking-[0.15em] text-text-tertiary">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        className={cn(
                          "inline-block text-body-sm leading-relaxed transition-all duration-300 tracking-[0.02em]",
                          variant === "dark"
                            ? "text-text-secondary hover:text-text-inverse"
                            : "text-text-secondary hover:text-text",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>
          ))}

          {contact && (
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-overline tracking-[0.15em] text-text-tertiary">
                Kontak
              </h3>
              <ul className="space-y-3">
                {contact.phone && (
                  <li>
                    <p className="text-body-sm text-text-secondary tracking-[0.02em]">{contact.phone}</p>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <p className="text-body-sm text-text-secondary tracking-[0.02em]">{contact.email}</p>
                  </li>
                )}
                {contact.address && (
                  <li>
                    <p className="text-body-sm text-text-secondary leading-relaxed tracking-[0.02em]">{contact.address}</p>
                  </li>
                )}
              </ul>
            </div>
          )}
          {businessHours && businessHours.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-overline tracking-[0.15em] text-text-tertiary">
                Jam Operasional
              </h3>
              <ul className="space-y-2">
                {businessHours.map((item) => (
                  <li key={item.day} className="flex justify-between gap-4 text-body-sm text-text-secondary tracking-[0.02em]">
                    <span>{item.day}</span>
                    <span>{item.isClosed ? "Tutup" : `${item.open} - ${item.close}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {copyright && (
        <div className="border-t border-gold-500/5 py-8">
          <div className="container-site">
            <p className="text-caption text-text-tertiary tracking-[0.08em]">{copyright}</p>
          </div>
        </div>
      )}
    </footer>
  );
}
