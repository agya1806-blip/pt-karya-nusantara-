import type { Metadata, Viewport } from "next";
import { fontSans, fontSerif, fontMono } from "@/lib";
import { Providers } from "@/providers/Providers";
import { createMetadata } from "@/seo";
import {
  DEFAULT_CHARSET,
  DEFAULT_VIEWPORT,
  THEME_COLOR_LIGHT,
} from "@/constants";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: DEFAULT_VIEWPORT,
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
      lang="en"
      data-theme="light"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet={DEFAULT_CHARSET} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
