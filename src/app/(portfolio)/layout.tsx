import { Navbar, Footer, PageWrapper, WhatsAppButton } from "@/components";
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
        businessHours={siteConfig.businessHours}
        copyright={`© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
      />
      <WhatsAppButton phone={siteConfig.contact.phone} />
    </>
  );
}
