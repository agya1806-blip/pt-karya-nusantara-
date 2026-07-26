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
    knowsAbout: [
      "Architecture",
      "Interior Design",
      "Master Planning",
      "Construction Management",
      "Property Development",
      "Sustainable Design",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture & Design Services",
      itemListElement: siteConfig.businessFields.map((field, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: field.name,
          description: field.description,
        },
        position: i + 1,
      })),
    },
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
    areaServed: [
      { "@type": "City", name: "Banda Aceh" },
      { "@type": "State", name: "Aceh" },
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Continent", name: "Asia Tenggara" },
    ],
    priceRange: "$$$$",
    currenciesAccepted: "IDR, USD",
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
  dateModified?: string;
  author: string;
  url: string;
  wordCount?: number;
  articleSection?: string;
  inLanguage?: string;
}): JsonLdArticle {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    image: `${siteConfig.url}${params.image}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { "@type": "Person", name: params.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${params.url}` },
    ...(params.wordCount ? { wordCount: params.wordCount } : {}),
    ...(params.articleSection ? { articleSection: params.articleSection } : {}),
    ...(params.inLanguage ? { inLanguage: params.inLanguage } : {}),
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

export function createReviewSchema(params: {
  itemName: string;
  reviewBody: string;
  authorName: string;
  reviewRating: number;
  bestRating?: number;
  datePublished?: string;
  url?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Project",
      name: params.itemName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: params.reviewRating,
      bestRating: params.bestRating ?? 5,
    },
    reviewBody: params.reviewBody,
    author: { "@type": "Person", name: params.authorName },
    ...(params.datePublished ? { datePublished: params.datePublished } : {}),
    ...(params.url ? { url: params.url } : {}),
  };
}

export function createWebPageSchema(params: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: string;
  isPartOf?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}${params.url}`,
    ...(params.breadcrumb ? { breadcrumb: { "@type": "BreadcrumbList", "@id": params.breadcrumb } } : {}),
    ...(params.isPartOf ? { isPartOf: { "@type": "WebSite", "@id": params.isPartOf } } : {}),
  };
}

export function createCollectionPageSchema(params: {
  name: string;
  description: string;
  url: string;
  numberOfItems?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}${params.url}`,
    ...(params.numberOfItems ? { numberOfItems: params.numberOfItems } : {}),
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}` },
  };
}

export function createFAQPageSchema(
  questions: { question: string; answer: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function createServiceSchema(params: {
  name: string;
  description: string;
  image?: string;
  providerName: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    provider: {
      "@type": "Organization",
      name: params.providerName,
    },
    ...(params.image ? { image: `${siteConfig.url}${params.image}` } : {}),
  };
}
