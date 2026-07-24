import type { Metadata, Viewport } from "next";
import { fontSans, fontSerif, fontMono } from "@/lib";
import { Providers } from "@/providers/Providers";
import {
  createMetadata,
  createOrganizationSchema,
  createWebsiteSchema,
  JsonLdScript,
} from "@/seo";
import {
  DEFAULT_CHARSET,
  DEFAULT_VIEWPORT,
  THEME_COLOR_LIGHT,
} from "@/constants";
import { siteConfig } from "@/config";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR_LIGHT,
  colorScheme: "light dark",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="id"
      data-theme="light"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet={DEFAULT_CHARSET} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLdScript data={createOrganizationSchema()} id="organization-schema" />
        <JsonLdScript data={createWebsiteSchema()} id="website-schema" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
        >
          Lewati ke konten utama
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
