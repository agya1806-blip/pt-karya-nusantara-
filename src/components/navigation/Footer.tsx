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
      <div className="container-site py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {logo && <div className="mb-4">{logo}</div>}
            {description && (
              <p
                className={cn(
                  "text-body-sm leading-relaxed",
                  variant === "dark"
                    ? "text-text-muted"
                    : "text-text-secondary",
                )}
              >
                {description}
              </p>
            )}
            {footerSocialLinks && footerSocialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-4">
                {footerSocialLinks.map((link) => (
                  <Link
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-body-sm font-medium tracking-tight transition-colors duration-300",
                      variant === "dark"
                        ? "text-text-muted hover:text-text-inverse"
                        : "text-text-secondary hover:text-text",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-caption tracking-widest uppercase text-text-tertiary">
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
                        "inline-block text-body-sm leading-relaxed transition-all duration-300",
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
        </div>
      </div>

      {copyright && (
        <div className="border-t border-border-muted py-6">
          <div className="container-site">
            <p className="text-caption text-text-muted">{copyright}</p>
          </div>
        </div>
      )}
    </footer>
  );
}
