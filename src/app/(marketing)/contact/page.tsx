import { ContactInfoSection, ContactFormWrapper, MapSection, ConsultationCTA } from "@/sections";
import { createMetadata } from "@/seo";
import { siteConfig } from "@/config";
import type { ContactInfo } from "@/sections";

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Hubungi ${siteConfig.name}. Kunjungi kantor kami di ${siteConfig.contact.address} atau hubungi via telepon, email, atau formulir kontak.`,
});

const contactDetails: ContactInfo = {
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
  social: siteConfig.social.map((s) => ({
    platform: s.label,
    url: s.url,
  })),
};

export default function ContactPage() {
  return (
    <>
      <ContactInfoSection
        title="Hubungi Kami"
        description="Kami siap mendengar tentang proyek Anda. Hubungi tim kami dan mari mulai percakapan."
        contact={contactDetails}
      />
      <ContactFormWrapper
        title="Kirim Pesan"
        description="Isi formulir di bawah dan tim kami akan merespon dalam 1x24 jam."
      />
      <MapSection
        address={siteConfig.contact.address}
        mapsUrl={siteConfig.contact.mapsUrl || ""}
      />
      <ConsultationCTA
        title="Book a Consultation"
        description="Schedule a one-on-one consultation with our principal architect to discuss your project in detail."
      />
    </>
  );
}
