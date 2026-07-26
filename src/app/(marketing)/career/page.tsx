import { CareerHero, Benefits, OpenPositions, CultureValues, RecruitmentProcess, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";

export const metadata = createMetadata({
  title: "Karier — Bergabung dengan Studio",
  description: "Gabung bersama Karya Nusantara Realty. Kami mencari arsitek visioner, desainer interior, dan profesional untuk menciptakan arsitektur bermakna di Asia Tenggara.",
});

const positions: Array<{
  id: string; title: string; department: string; location: string; type: "Full-time" | "Contract"; description: string; postedDate: string;
}> = [
  { id: "1", title: "Arsitek Senior", department: "Desain", location: "Jakarta", type: "Full-time", description: "Memandu proyek arsitektur kompleks dari tahap konsepsi hingga pengawasan konstruksi — sebagai ujung tombak kualitas studio.", postedDate: "2025-06-01" },
  { id: "2", title: "Arsitek Junior", department: "Desain", location: "Jakarta", type: "Full-time", description: "Mendampingi arsitek senior dalam pengembangan desain, dokumentasi teknis, dan koordinasi lapangan dengan antusiasme tinggi.", postedDate: "2025-06-01" },
  { id: "3", title: "Desainer Interior", department: "Interior", location: "Jakarta", type: "Full-time", description: "Merumuskan konsep dan spesifikasi interior untuk proyek residensial dan hospitality bercita rasa tinggi.", postedDate: "2025-05-15" },
  { id: "4", title: "Spesialis BIM", department: "Teknologi", location: "Jakarta", type: "Contract", description: "Mengelola alur kerja BIM tingkat lanjut, menyusun model presisi, dan mendukung koordinasi proyek multidisiplin.", postedDate: "2025-05-15" },
  { id: "5", title: "Kepala Pemasaran", department: "Pemasaran", location: "Jakarta", type: "Full-time", description: "Memimpin strategi komunikasi merek, pengembangan bisnis, dan kurasi portofolio studio.", postedDate: "2025-04-20" },
  { id: "6", title: "Manajer Proyek", department: "Operasional", location: "Jakarta", type: "Full-time", description: "Mengelola jadwal, anggaran, dan hubungan klien di seluruh portofolio proyek studio.", postedDate: "2025-04-20" },
];

export default function CareerPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Karier — Karya Nusantara Realty",
        description: "Lowongan untuk arsitek, desainer interior, spesialis BIM, dan profesional arsitektur di Banda Aceh dan Jakarta.",
        url: "/career",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Karier" },
      ])} id="breadcrumb-schema" />
      <CareerHero
        title="Bangun Karier, Ciptakan Warisan"
        subtitle="Karya Nusantara Realty"
        description="Jadilah bagian dari studio yang menciptakan arsitektur bermakna dan abadi di Asia Tenggara."
        image={{ src: "/images/career/hero.jpg", alt: "Suasana studio Karya Nusantara Realty" }}
        cta={{ label: "Eksplorasi Posisi", href: "#positions" }}
      />
      <CultureValues
        title="Nilai & Kultur"
        description="Budaya studio yang bertumpu pada kejujuran desain, rasa ingin tahu, dan saling menghargai."
        values={[
          { title: "Inovasi", description: "Kami terus mendorong batas dalam desain, materialitas, dan metode pendekatan." },
          { title: "Kolaborasi", description: "Gagasan agung lahir dari dialog terbuka dan beragam perspektif." },
          { title: "Keunggulan", description: "Standar tertinggi bukanlah target — melainkan kebiasaan." },
        ]}
      />
      <Benefits
        title="Mengapa Bergabung?"
        description="Kami merawat bakat dan menyediakan ekosistem tempat kreativitas tumbuh dan karier dibangun."
        benefits={[
          { title: "Kebebasan Berkarya", description: "Otonomi penuh untuk mengeksplorasi solusi desain inovatif tanpa sekat.", icon: "💡" },
          { title: "Kompensasi Premium", description: "Paket kompensasi kompetitif, bonus kinerja, dan tunjangan menyeluruh.", icon: "💰" },
          { title: "Perkembangan Profesional", description: "Pembelajaran berkelanjutan, lokakarya eksklusif, dan paparan internasional.", icon: "📈" },
          { title: "Lingkungan Suportif", description: "Berkarya bersama arsitek dan desainer terbaik dalam studio yang saling menginspirasi.", icon: "👥" },
        ]}
      />
      <RecruitmentProcess
        title="Proses Seleksi"
        description="Proses yang dirancang untuk menemukan kecocokan sejati — antara bakat Anda dan visi studio."
        steps={[
          { title: "Tinjauan Lamaran", description: "Tim kami menelaah portofolio dan surat lamaran Anda secara saksama." },
          { title: "Dialog Awal", description: "Percakapan ringan untuk mengenal latar belakang dan aspirasi Anda." },
          { title: "Presentasi Karya", description: "Paparkan portofolio terbaik Anda di hadapan pimpinan desain studio." },
          { title: "Wawancara Akhir", description: "Bertemu dengan mitra senior untuk diskusi peran, nilai, dan visi." },
          { title: "Penawaran", description: "Kandidat terpilih akan menerima tawaran untuk bergabung dalam perjalanan studio." },
        ]}
      />
      <OpenPositions
        title="Posisi yang Tersedia"
        description="Kesempatan terkini untuk menjadi bagian dari pertumbuhan studio kami."
        positions={positions}
      />
      <CTADefault
        title="Belum Menemukan Peran yang Sesuai?"
        description="Kami selalu terbuka untuk talenta luar biasa. Kirimkan portofolio Anda dan kami akan mengingat Anda untuk kesempatan mendatang."
        primaryCta={{ label: "Kirim Portofolio", href: "/contact" }}
      />
    </>
  );
}