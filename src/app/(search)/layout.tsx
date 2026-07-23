import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { siteConfig } from "@/config";
import { PageWrapper } from "@/components/layout/PageWrapper";

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <Navbar items={siteConfig.navigation} />
      <PageWrapper>{children}</PageWrapper>
      <Footer
        sections={siteConfig.footer}
        social={siteConfig.social}
        contact={siteConfig.contact}
      />
    </>
  );
}
