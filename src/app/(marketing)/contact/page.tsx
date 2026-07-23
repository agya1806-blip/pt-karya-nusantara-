import { ContactInfoSection, ContactFormWrapper, ConsultationCTA } from "@/sections";
import { createMetadata } from "@/seo";
import type { ContactInfo } from "@/sections";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with PT Karya Nusantara Realty. Visit our Jakarta studio or reach out via phone, email, or our contact form.",
});

const contactDetails: ContactInfo = {
  phone: "+62 21 1234 5678",
  email: "hello@karya-nusantara.com",
  address: "Jl. Sudirman Kav. 52-53, Jakarta Selatan, 12190",
  social: [
    { platform: "Instagram", url: "https://instagram.com/karya-nusantara" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <ContactInfoSection
        title="Get in Touch"
        description="We would love to hear about your project. Reach out to our team and let's start a conversation."
        contact={contactDetails}
      />
      {/* MapSection commented out — component not available */}
      <ContactFormWrapper
        title="Send Us a Message"
        description="Fill out the form below and our team will get back to you within 24 hours."
      />
      <ConsultationCTA
        title="Book a Consultation"
        description="Schedule a one-on-one consultation with our principal architect to discuss your project in detail."
      />
    </>
  );
}
