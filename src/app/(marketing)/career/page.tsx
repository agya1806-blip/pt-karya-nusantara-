import { CareerHero, Benefits, OpenPositions, CultureValues, RecruitmentProcess, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Karier",
  description: "Bergabunglah dengan PT Karya Nusantara Realty dan berkontribusi pada arsitektur yang bermakna di Asia Tenggara.",
});

const positions: Array<{
  id: string; title: string; department: string; location: string; type: "Full-time" | "Contract"; description: string; postedDate: string;
}> = [
  { id: "1", title: "Arsitek Senior", department: "Desain", location: "Jakarta", type: "Full-time", description: "Memimpin proyek arsitektur kompleks dari konsep hingga administrasi konstruksi.", postedDate: "2025-06-01" },
  { id: "2", title: "Arsitek Junior", department: "Desain", location: "Jakarta", type: "Full-time", description: "Mendukung arsitek senior dalam pengembangan desain, dokumentasi, dan koordinasi lapangan.", postedDate: "2025-06-01" },
  { id: "3", title: "Desainer Interior", department: "Interior", location: "Jakarta", type: "Full-time", description: "Mengembangkan konsep dan spesifikasi desain interior untuk proyek residensial dan hospitality mewah.", postedDate: "2025-05-15" },
  { id: "4", title: "Spesialis BIM", department: "Teknologi", location: "Jakarta", type: "Contract", description: "Mengelola alur kerja BIM, membuat model terperinci, dan mendukung koordinasi proyek.", postedDate: "2025-05-15" },
  { id: "5", title: "Manajer Pemasaran", department: "Pemasaran", location: "Jakarta", type: "Full-time", description: "Memimpin strategi pemasaran, pengembangan merek, dan inisiatif pengembangan bisnis.", postedDate: "2025-04-20" },
  { id: "6", title: "Manajer Proyek", department: "Operasional", location: "Jakarta", type: "Full-time", description: "Mengawasi jadwal proyek, anggaran, dan komunikasi klien di berbagai proyek.", postedDate: "2025-04-20" },
];

export default function CareerPage() {
  return (
    <>
      <CareerHero
        title="Bergabung dengan Tim Kami"
        subtitle="PT Karya Nusantara Realty"
        description="Jadilah bagian dari praktik yang menciptakan arsitektur bermakna di Asia Tenggara."
        image={{ src: "/images/career/hero.jpg", alt: "Karier di Karya Nusantara Realty" }}
        cta={{ label: "Lihat Posisi Terbuka", href: "#positions" }}
      />
      <CultureValues
        title="Budaya Kami"
        description="Budaya studio yang dibangun di atas ketelitian, rasa ingin tahu, dan saling menghormati."
        values={[
          { title: "Inovasi", description: "Kami menjelajahi batas-batas baru dalam desain, materialitas, dan metode." },
          { title: "Kolaborasi", description: "Ide-ide hebat muncul dari dialog terbuka dan perspektif yang beragam." },
          { title: "Keunggulan", description: "Kami memegang standar tertinggi dalam setiap usaha." },
        ]}
      />
      <Benefits
        title="Mengapa Bekerja dengan Kami"
        description="Kami mengembangkan bakat dan menyediakan lingkungan di mana kreativitas dan ketelitian berkembang."
        benefits={[
          { title: "Kebebasan Kreatif", description: "Otonomi untuk mengeksplorasi solusi desain inovatif dan mendorong batasan.", icon: "💡" },
          { title: "Kompensasi Kompetitif", description: "Paket menarik, bonus kinerja, dan tunjangan komprehensif.", icon: "💰" },
          { title: "Pertumbuhan Profesional", description: "Pembelajaran berkelanjutan, lokakarya, dan paparan internasional.", icon: "📈" },
          { title: "Budaya Kolaboratif", description: "Bekerja bersama arsitek dan desainer berpengalaman di studio yang mendukung.", icon: "👥" },
        ]}
      />
      <RecruitmentProcess
        title="Proses Rekrutmen"
        description="Proses transparan yang dirancang untuk mengidentifikasi bakat dan memastikan kecocokan mutual."
        steps={[
          { title: "Review Lamaran", description: "Tim kami meninjau lamaran dan portofolio Anda." },
          { title: "Wawancara Awal", description: "Percakapan untuk mendiskusikan latar belakang dan aspirasi Anda." },
          { title: "Presentasi Portofolio", description: "Presentasikan karya Anda kepada pimpinan desain kami." },
          { title: "Wawancara Akhir", description: "Bertemu dengan pimpinan senior untuk membahas peran dan kecocokan budaya." },
          { title: "Penawaran", description: "Kandidat yang berhasil menerima tawaran untuk bergabung dengan studio." },
        ]}
      />
      <OpenPositions
        title="Posisi Terbuka"
        description="Kesempatan saat ini untuk bergabung dengan praktik kami yang sedang berkembang."
        positions={positions}
      />
      <CTADefault
        title="Tidak Melihat Peran yang Tepat?"
        description="Kami selalu mencari bakat luar biasa. Kirimkan portofolio Anda dan kami akan mengingat Anda untuk kesempatan di masa depan."
        primaryCta={{ label: "Hubungi Kami", href: "/contact" }}
      />
    </>
  );
}