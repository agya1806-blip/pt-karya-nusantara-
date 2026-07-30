import { AnimatedSection } from "@/components/animation";
import { PricingTable, ServicePackages, ComparisonTable, StatisticsShowcase, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { StatItem } from "@/sections";

export const metadata = createMetadata({
  title: "Biaya Layanan",
  description: "Gambaran indikatif biaya untuk layanan arsitektur residensial, komersial, dan master plan dari Karya Nusantara Realty — disesuaikan sepenuhnya dengan kebutuhan proyek Anda.",
});

const plans = [
  {
    name: "Esensial",
    description: "Pendekatan tepat untuk proyek residensial skala intim dan renovasi bermakna.",
    price: "Mulai Rp 150 Juta",
    period: "per proyek",
    features: ["Konsultasi Awal", "Desain Konseptual", "Denah & Tampak Bangunan", "Gambar IMB", "2 Siklus Revisi"],
    cta: { label: "Tanyakan Detailnya", href: "/contact" },
  },
  {
    name: "Premium",
    description: "Dirancang bagi rumah kustom dan proyek komersial yang mengutamakan keunggulan desain.",
    price: "Mulai Rp 350 Juta",
    period: "per proyek",
    features: ["Semua Layanan Esensial", "Render 3D Fotorealistik", "Integrasi Desain Interior", "Kurasi Material Premium", "Pengawasan Konstruksi", "Revisi Tak Terbatas"],
    highlighted: true,
    cta: { label: "Paling Diminati — Konsultasi", href: "/contact" },
  },
  {
    name: "Enterprise",
    description: "Solusi komprehensif bagi pengembangan skala besar dan master plan ambisius.",
    price: "Disesuaikan",
    period: "berdasarkan lingkup",
    features: ["Semua Layanan Premium", "Manajemen Proyek Penuh", "Konsultasi Keberlanjutan", "Desain Lansekap Terpadu", "Spesifikasi FF&E Lengkap", "Dukungan Pasca Hunian"],
    cta: { label: "Diskusikan Proyek Anda", href: "/contact" },
  },
];

const stats: StatItem[] = [
  { value: "200", label: "Proyek Terwujud", suffix: "+" },
  { value: "50", label: "Penghargaan Bergengsi", suffix: "+" },
  { value: "15", label: "Tahun Dedikasi" },
  { value: "100", label: "Klien Puas", suffix: "%" },
];

export default function PricingPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Biaya Layanan Arsitektur",
        description: "Gambaran indikatif biaya untuk layanan arsitektur residensial, komersial, dan master plan dari Karya Nusantara Realty.",
        url: "/pricing",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Biaya" },
      ])} id="breadcrumb-schema" />
      <AnimatedSection>
        <PricingTable
          title="Ikhtisar Biaya"
          description="Kisaran indikatif berdasarkan tipologi proyek. Setiap penawaran bersifat khusus — diselaraskan dengan lingkup dan aspirasi unik Anda."
          plans={plans}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ServicePackages
          title="Paket Layanan"
          description="Pilih pendekatan yang paling selaras dengan skala dan ambisi proyek Anda."
          packages={plans.map((p) => ({ title: p.name, description: p.description ?? "", price: p.price, period: p.period, features: p.features }))}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ComparisonTable
          title="Perbandingan Layanan"
          description="Pandangan menyeluruh dari setiap tingkatan untuk membantu Anda memutuskan."
          plans={plans.map((p) => ({ name: p.name, highlighted: p.highlighted, features: p.features }))}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <StatisticsShowcase
          title="Mengapa Mempercayai Kami?"
          description="Angka-angka yang merekam jejak perjalanan, komitmen, dan kepercayaan yang diamanatkan kepada kami."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Tak Yakin Paket Mana yang Tepat?"
          description="Konsultasi awal tanpa biaya — kami akan merekomendasikan pendekatan terbaik untuk proyek Anda."
          primaryCta={{ label: "Jadwalkan Konsultasi Gratis", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}