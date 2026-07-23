import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { siteConfig } from "@/config";
import { PageWrapper } from "@/components/layout/PageWrapper";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <>
      <Navbar items={siteConfig.navigation} variant="transparent" />
      <PageWrapper>{children}</PageWrapper>
      <Footer
        sections={siteConfig.footer}
        social={siteConfig.social}
        contact={siteConfig.contact}
      />
    </>
  );
}
