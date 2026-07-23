import type { Metadata } from "next";

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  locale: string;
  type: "website" | "article";
}

export interface TwitterCard {
  card: "summary" | "summary_large_image" | "app" | "player";
  site: string;
  creator: string;
  title: string;
  description: string;
  images: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: OpenGraph;
  twitter: TwitterCard;
  metadataBase: URL;
  alternates: {
    canonical: string;
  };
}

export type GenerateMetadata = (
  params: Record<string, string | string[] | undefined>,
) => Metadata;

export interface JsonLd {
  "@context": "https://schema.org";
  "@type": string;
  name?: string;
  description?: string;
  url?: string;
  [key: string]: unknown;
}

export interface JsonLdBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }[];
  [key: string]: unknown;
}

export interface JsonLdArticle {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  [key: string]: unknown;
}

export interface JsonLdProduct {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  image: string | string[];
  category: string;
  location?: string;
  dateCreated?: string;
  [key: string]: unknown;
}
