import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { siteConfig } from "@/config";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <Navbar items={siteConfig.navigation} />
      <main className="min-h-screen">{children}</main>
      <Footer
        sections={siteConfig.footer}
        social={siteConfig.social}
        contact={siteConfig.contact}
      />
    </>
  );
}
