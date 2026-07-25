import { PricingTable, ServicePackages, ComparisonTable, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Biaya Layanan",
  description: "Struktur biaya kami disesuaikan dengan lingkup dan ambisi setiap proyek. Jelajahi indikasi harga untuk layanan residensial, komersial, dan master plan.",
});

const plans = [
  {
    name: "Esensial",
    description: "Cocok untuk proyek residensial skala kecil dan renovasi.",
    price: "Rp 150 Juta",
    period: "per proyek",
    features: ["Konsultasi Awal", "Desain Konsep", "Denah Lantai & Tampak", "Gambar IMB", "2 Putaran Revisi"],
    cta: { label: "Ajukan Pertanyaan", href: "/contact" },
  },
  {
    name: "Premium",
    description: "Dirancang untuk rumah kustom dan proyek komersial skala menengah.",
    price: "Rp 350 Juta",
    period: "per proyek",
    features: ["Semua di Esensial", "Render 3D", "Integrasi Desain Interior", "Pemilihan Material", "Administrasi Konstruksi", "Revisi Tak Terbatas"],
    highlighted: true,
    cta: { label: "Paling Diminati", href: "/contact" },
  },
  {
    name: "Enterprise",
    description: "Solusi komprehensif untuk pengembangan skala besar dan master plan.",
    price: "Kustom",
    period: "negoisasi",
    features: ["Semua di Premium", "Manajemen Proyek Penuh", "Konsultasi Keberlanjutan", "Desain Lansekap", "Spesifikasi FF&E", "Dukungan Pasca Penyelesaian"],
    cta: { label: "Hubungi Kami", href: "/contact" },
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingTable
        title="Struktur Biaya"
        description="Kisaran biaya indikatif untuk tipologi proyek umum. Setiap penawaran disesuaikan dengan lingkup dan ambisi spesifik proyek Anda."
        plans={plans}
      />
      <ServicePackages
        title="Paket Layanan"
        description="Pilih paket yang paling sesuai dengan skala proyek Anda."
        packages={plans.map((p) => ({ title: p.name, description: p.description ?? "", price: p.price, period: p.period, features: p.features }))}
      />
      <ComparisonTable
        title="Bandingkan Paket"
        description="Gambaran umum tentang apa yang disertakan setiap tingkatan."
        plans={plans.map((p) => ({ name: p.name, highlighted: p.highlighted, features: p.features }))}
      />
      <CTADefault
        title="Tidak Yakin Paket yang Tepat?"
        description="Jadwalkan konsultasi gratis dan kami akan merekomendasikan pendekatan yang tepat untuk proyek Anda."
        primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
      />
    </>
  );
}