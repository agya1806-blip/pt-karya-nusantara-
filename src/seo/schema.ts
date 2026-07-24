import type { JsonLd, JsonLdBreadcrumbList, JsonLdArticle, JsonLdProduct } from "@/types";
import { siteConfig } from "@/config";

export function createOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    identifier: siteConfig.nib,
    founder: {
      "@type": "Person",
      name: siteConfig.director,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lorong Sawah I, Lambhuk",
      addressLocality: "Kec. Ulee Kareng, Kota Banda Aceh",
      addressRegion: "Aceh",
      postalCode: "23188",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: "layanan pelanggan",
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    sameAs: siteConfig.social.map((s) => s.url).filter(Boolean),
  };
}

export function createWebsiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createLocalBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    identifier: siteConfig.nib,
    founder: {
      "@type": "Person",
      name: siteConfig.director,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lorong Sawah I, Lambhuk",
      addressLocality: "Kec. Ulee Kareng, Kota Banda Aceh",
      addressRegion: "Aceh",
      postalCode: "23188",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    openingHoursSpecification: siteConfig.businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.day,
      opens: hours.open,
      closes: hours.close,
      ...(hours.isClosed ? { opens: "", closes: "" } : {}),
    })),
  };
}

export function createBreadcrumbSchema(items: { name: string; href?: string }[]): JsonLdBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteConfig.url },
      ...items.map((item, index) => ({
        "@type": "ListItem" as const,
        position: index + 2,
        name: item.name,
        ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
      })),
    ],
  };
}

export function createArticleSchema(params: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
  url: string;
}): JsonLdArticle {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    image: `${siteConfig.url}${params.image}`,
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    author: { "@type": "Person", name: params.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${params.url}` },
  };
}

export function createProjectSchema(params: {
  name: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  year?: string;
}): JsonLdProduct {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: `${siteConfig.url}${params.image}`,
    category: params.category,
    ...(params.location ? { location: params.location } : {}),
    ...(params.year ? { dateCreated: params.year } : {}),
  };
}
