import { Navbar, Footer, PageWrapper, WhatsAppButton } from "@/components";
import { siteConfig } from "@/config";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <Navbar links={siteConfig.navigation} />
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
