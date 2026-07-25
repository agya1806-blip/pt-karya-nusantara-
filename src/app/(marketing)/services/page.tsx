import { AnimatedSection } from "@/components/animation";
import { ServiceOverview, ServicesGrid, ProcessSteps, ConsultationCTA, CTADefault } from "@/sections";
import { createMetadata, createServiceSchema, JsonLdScript } from "@/seo";
import { siteConfig } from "@/config";
import type { ServiceItem, ProcessStep } from "@/sections";
import { Search, Lightbulb, PenTool, FileText, HardHat } from "lucide-react";

export const metadata = createMetadata({
  title: "Layanan",
  description: "Spektrum lengkap layanan arsitektur dan desain — dari hunian pribadi hingga master plan skala besar — diantarkan dengan kualitas tanpa kompromi.",
});

const services: ServiceItem[] = [
  { title: "Arsitektur Residensial", description: "Rumah, vila, dan hunian pribadi — masing-masing dihadirkan sebagai ekspresi unik dari pemilik dan lahannya.", features: ["Desain Rumah Kustom", "Renovasi & Perluasan", "Arsitektur Interior", "Integrasi Lansekap"], image: { src: "/images/services/residential.jpg", alt: "Arsitektur residensial mewah" }, href: "/contact" },
  { title: "Arsitektur Komersial", description: "Gedung perkantoran, lingkungan ritel, dan pengembangan mixed-use yang dirancang untuk meningkatkan identitas merek dan pengalaman pengguna.", features: ["Gedung Perkantoran", "Ritel & Hospitality", "Pengembangan Mixed-Use", "Strategi Tempat Kerja"], image: { src: "/images/services/commercial.jpg", alt: "Arsitektur komersial" }, href: "/contact" },
  { title: "Desain Hospitality", description: "Resor, hotel, dan restoran di mana arsitektur menjadi bagian penting dari pengalaman tamu.", features: ["Desain Resor", "Arsitektur Hotel", "Restoran & Bar", "Spa & Kebugaran"], image: { src: "/images/services/hospitality.jpg", alt: "Desain hospitality" }, href: "/contact" },
  { title: "Master Plan", description: "Perencanaan tapak strategis dan desain urban untuk pengembangan skala besar dan komunitas baru.", features: ["Analisis Tapak", "Desain Urban", "Perencanaan Infrastruktur", "Strategi Keberlanjutan"], image: { src: "/images/services/master-planning.jpg", alt: "Master plan" }, href: "/contact" },
  { title: "Desain Interior", description: "Interior yang refined di mana material, proporsi, dan cahaya bersatu menciptakan ruang berkarakter.", features: ["Perencanaan Spasial", "Pemilihan Material", "Furnitur Kustom", "Desain Pencahayaan"], image: { src: "/images/services/interior.jpg", alt: "Desain interior" }, href: "/contact" },
  { title: "Desain Berkelanjutan", description: "Arsitektur yang ramah lingkungan — material rendah karbon, strategi pasif, dan komitmen terhadap umur panjang.", features: ["Desain Pasif", "Pemodelan Energi", "Pengadaan Material", "Sertifikasi Hijau"], image: { src: "/images/services/sustainable.jpg", alt: "Arsitektur berkelanjutan" }, href: "/contact" },
];

const workflowSteps: ProcessStep[] = [
  { title: "Penemuan", description: "Memahami visi, aspirasi, dan karakter unik lahan Anda melalui konsultasi yang mendalam.", icon: <Search size={20} /> },
  { title: "Desain Konsep", description: "Menerjemahkan ide menjadi narasi spasial melalui sketsa, mood board, dan model studi untuk pertimbangan Anda.", icon: <Lightbulb size={20} /> },
  { title: "Pengembangan Desain", description: "Menyempurnakan setiap detail — material, proporsi, sistem, dan anggaran — dengan presisi dan kejelasan.", icon: <PenTool size={20} /> },
  { title: "Dokumen Konstruksi", description: "Gambar teknis dan spesifikasi komprehensif disiapkan untuk perizinan, tender, dan konstruksi.", icon: <FileText size={20} /> },
  { title: "Administrasi Konstruksi", description: "Pengawasan desain yang ketat selama konstruksi untuk memastikan setiap elemen terwujud sesuai rencana.", icon: <HardHat size={20} /> },
];

export default function ServicesPage() {
  return (
    <>
      {services.map((service, index) => (
        <JsonLdScript
          key={service.title}
          data={createServiceSchema({
            name: service.title,
            description: service.description,
            image: service.image?.src,
            providerName: siteConfig.name,
          })}
          id={`service-schema-${index}`}
        />
      ))}
      <AnimatedSection>
        <ServiceOverview
          title="Layanan Kami"
          description="Dari konsep hingga penyelesaian, setiap komisi mendapat perhatian penuh dari studio kami — kedalaman perhatian yang membedakan karya kami."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ServicesGrid title="Layanan Kami" description="Spektrum lengkap kemampuan arsitektur dan desain, diantarkan dengan standar keunggulan yang konsisten." services={services} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProcessSteps title="Cara Kami Bekerja" steps={workflowSteps} />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ConsultationCTA
          title="Jadwalkan Konsultasi"
          description="Bicaralah dengan tim kami tentang proyek Anda dalam konsultasi gratis yang disesuaikan dengan kebutuhan Anda."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Tidak Yakin Harus Mulai dari Mana?"
          description="Jelaskan proyek Anda kepada kami dan kami akan merekomendasikan pendekatan yang paling sesuai selama konsultasi gratis."
          primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}