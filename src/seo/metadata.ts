import type { Metadata } from "next";
import { siteConfig } from "@/config";
import { METADATA, DEFAULT_LOCALE } from "@/constants";

export function createMetadata(override?: Partial<Metadata>): Metadata {
  return {
    title: {
      default: METADATA.DEFAULT_TITLE,
      template: METADATA.TITLE_TEMPLATE,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: [
      "arsitek Aceh",
      "konsultan arsitek",
      "jasa desain rumah",
      "arsitek Banda Aceh",
      "kontraktor Aceh",
      "desain interior",
      "konsultan properti",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: DEFAULT_LOCALE,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.name,
    },
    alternates: {
      canonical: siteConfig.url,
    },
    ...override,
  };
}
