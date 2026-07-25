import { ContactInfoSection, ContactFormWrapper, MapSection, CTADefault } from "@/sections";
import { ContactBookingSection } from "./contact-booking";
import { ContactDownloadSection } from "./contact-download";
import { createMetadata } from "@/seo";
import type { ContactInfo } from "@/sections";

export const metadata = createMetadata({
  title: "Hubungi Kami",
  description: "Hubungi PT Karya Nusantara Realty. Kunjungi studio kami di Banda Aceh atau hubungi melalui telepon, email, atau formulir kontak.",
});

const contactDetails: ContactInfo = {
  phone: "+62 813 6054 6845",
  email: "karyanusantararealty@gmail.com",
  address: "Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188",
  social: [
    { platform: "Instagram", url: "https://instagram.com/karya-nusantara" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <ContactInfoSection
        title="Hubungi Kami"
        description="Kami ingin mendengar tentang proyek Anda. Hubungi tim kami dan mari mulai percakapan."
        contact={contactDetails}
      />
      <ContactBookingSection />
      <ContactDownloadSection />
      <MapSection
        address="Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188"
        mapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.9!2d95.3388!3d5.5615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnNDEuNSJTIDk1wrAyMCcxOS43IkU!5e0!3m2!1sid!2sid!4v1"
      />
      <CTADefault
        title="Jadwalkan Konsultasi"
        description="Jadwalkan konsultasi tatap muka dengan arsitek utama kami untuk membahas proyek Anda secara detail."
        primaryCta={{ label: "Jadwalkan Sekarang", href: "#consultation-booking" }}
      />
    </>
  );
}