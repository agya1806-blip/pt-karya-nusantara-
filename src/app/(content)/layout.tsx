import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
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
      />
    </>
  );
}
