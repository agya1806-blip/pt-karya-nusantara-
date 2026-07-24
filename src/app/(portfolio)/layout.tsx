import { Navbar, Footer, PageWrapper } from "@/components";
import { siteConfig } from "@/config";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <>
      <Navbar links={siteConfig.navigation} variant="transparent" />
      <PageWrapper>{children}</PageWrapper>
      <Footer
        columns={siteConfig.footer}
        socialLinks={siteConfig.social}
        contact={siteConfig.contact}
      />
    </>
  );
}
