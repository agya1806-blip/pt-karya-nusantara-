import type { Metadata, Viewport } from "next";
import { fontSans, fontSerif, fontMono } from "@/lib";
import { Providers } from "@/providers/Providers";
import {
  createMetadata,
  createOrganizationSchema,
  createWebsiteSchema,
  createLocalBusinessSchema,
  JsonLdScript,
} from "@/seo";
import {
  DEFAULT_CHARSET,
  DEFAULT_VIEWPORT,
  THEME_COLOR_LIGHT,
} from "@/constants";
import { PageTransitionWrapper } from "@/components/animation";
import { BackToTop } from "@/components/ui/BackToTop";
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
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta charSet={DEFAULT_CHARSET} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var e=localStorage.getItem("theme-mode");if(!e&&(e=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"),e)document.documentElement.setAttribute("data-theme",e)})()`,
        }} />
        <JsonLdScript data={createOrganizationSchema()} id="organization-schema" />
        <JsonLdScript data={createWebsiteSchema()} id="website-schema" />
        <JsonLdScript data={createLocalBusinessSchema()} id="local-business-schema" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
        >
          Lewati ke konten utama
        </a>
        <Providers>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </Providers>
        <BackToTop />
      </body>
    </html>
  );
}
