import { cn } from "@/lib/utils";

interface Partner {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
}

interface PartnersSectionProps {
  title?: string;
  description?: string;
  partners: Partner[];
  className?: string;
}

export function PartnersSection({
  title,
  description,
  partners,
  className,
}: PartnersSectionProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container-site">
        {(title || description) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {title && (
              <h2 className="text-heading-xl font-light leading-tight tracking-tight text-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-body-lg leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center rounded-xl border border-border-light bg-surface p-8 text-center transition-all duration-500 ease-architectural hover:border-border-default hover:shadow-elevation-4"
            >
              {partner.logo && (
                <div className="mb-5">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto"
                  />
                </div>
              )}
              <h3 className="text-body font-medium text-text">
                {partner.name}
              </h3>
              {partner.description && (
                <p className="mt-3 text-body-sm leading-relaxed text-text-secondary">
                  {partner.description}
                </p>
              )}
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-body-sm font-medium text-text underline-offset-2 transition-colors duration-300 hover:text-text hover:underline"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
