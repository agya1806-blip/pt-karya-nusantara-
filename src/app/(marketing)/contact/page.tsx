import { ContactInfoSection, ContactFormWrapper, MapSection, CTADefault } from "@/sections";
import { ContactBookingSection } from "./contact-booking";
import { ContactDownloadSection } from "./contact-download";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { ContactInfo } from "@/sections";

export const metadata = createMetadata({
  title: "Hubungi Kami",
  description: "Terhubung dengan Karya Nusantara Realty — studio arsitektur di Banda Aceh. Konsultasi awal tanpa biaya untuk hunian, properti komersial, dan master plan.",
});

const contactDetails: ContactInfo = {
  phone: "+62 813 6054 6845",
  email: "karyanusantararealty@gmail.com",
  address: "Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188",
  social: [
    { platform: "Instagram", url: "https://instagram.com/karya-nusantara", label: "Instagram" },
    { platform: "WhatsApp", url: "https://wa.me/6281360546845?text=Halo%20Karya%20Nusantara%20Realty%2C%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20arsitektur.", label: "WhatsApp" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Hubungi Karya Nusantara Realty",
        description: "Studio arsitektur di Banda Aceh — hubungi kami untuk konsultasi desain hunian premium, properti komersial, dan master plan.",
        url: "/contact",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Kontak" },
      ])} id="breadcrumb-schema" />
      <ContactInfoSection
        title="Hubungi Studio"
        description="Kami sangat antusias mendengar gagasan Anda. Sampaikan pesan Anda, dan tim kami akan merespons dalam 24 jam."
        contact={contactDetails}
        hours="Sen–Jum 09:00–18:00 · Sab 09:00–13:00"
      />
      <ContactBookingSection />
      <ContactDownloadSection />
      <MapSection
        address="Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188"
        mapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.9!2d95.3388!3d5.5615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnNDEuNSJTIDk1wrAyMCcxOS43IkU!5e0!3m2!1sid!2sid!4v1"
      />
      <CTADefault
        title="Siap Memulai Percakapan?"
        description="Jadwalkan sesi konsultasi eksklusif dengan arsitek utama kami untuk membahas visi proyek Anda."
        primaryCta={{ label: "Pesan Konsultasi", href: "#consultation-booking" }}
      />
    </>
  );
}