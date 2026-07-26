import type { Metadata } from "next";
import { siteConfig } from "@/config";
import { METADATA, DEFAULT_LOCALE } from "@/constants";
import { env } from "@/config/env";

export function createMetadata(override?: Partial<Metadata>): Metadata {
  const keywords = [
    "arsitek Aceh",
    "arsitek Banda Aceh",
    "jasa arsitek rumah mewah",
    "desain vila mewah Indonesia",
    "arsitektur komersial premium",
    "desain interior mewah",
    "kontraktor rumah mewah Aceh",
    "master plan kawasan terpadu",
    "desain resor mewah",
    "arsitek bangunan komersial",
    "konsultan properti Aceh",
    "jasa desain arsitektur",
    "arsitektur tropis modern",
    "desain rumah minimalis mewah",
    "arsitek profesional Indonesia",
    "perencanaan konstruksi Aceh",
    "desain bangunan hijau",
    "arsitektur berkelanjutan",
    "pembangunan vila mewah",
    "konsultan arsitek terpercaya",
  ];

  const metadata: Metadata = {
    title: {
      default: METADATA.DEFAULT_TITLE,
      template: METADATA.TITLE_TEMPLATE,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    keywords,
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

  const gsv = env.googleSiteVerification;
  if (gsv) {
    metadata.other = {
      ...metadata.other,
      "google-site-verification": gsv,
    };
  }

  return metadata;
}
