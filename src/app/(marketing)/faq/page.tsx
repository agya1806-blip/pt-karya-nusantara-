import { FAQAccordion, CategoryFAQ, CTADefault } from "@/sections";
import { createMetadata, createFAQPageSchema, JsonLdScript } from "@/seo";
import { FAQSearch } from "./faq-search";
import type { FAQItem } from "@/sections";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Jawaban atas pertanyaan umum tentang layanan arsitektur, proses desain, dan cara bekerja sama dengan kami.",
});

const generalFAQ: FAQItem[] = [
  { question: "Jenis proyek apa yang ditangani PT Karya Nusantara Realty?", answer: "Kami mengkhususkan diri pada proyek residensial mewah, komersial, hospitality, dan master plan. Portofolio kami mencakup vila pribadi hingga hotel butik dan pengembangan mixed-use.", category: "Umum" },
  { question: "Di mana kantor Anda berada?", answer: "Studio kami berbasis di Banda Aceh, Indonesia. Kami melayani klien baik domestik maupun internasional.", category: "Umum" },
  { question: "Apa filosofi desain Anda?", answer: "Kami menciptakan ruang dengan keindahan dan tujuan yang abadi — setiap desain berakar pada konteks, budaya, dan aspirasi penghuninya.", category: "Umum" },
  { question: "Apakah Anda menangani proyek di luar Indonesia?", answer: "Ya. Kami telah menyelesaikan proyek di seluruh Asia Tenggara, termasuk Singapura, Malaysia, Thailand, dan lainnya. Kolaborasi internasional selalu kami sambut.", category: "Umum" },
];

const processFAQ: FAQItem[] = [
  { question: "Bagaimana proses desain Anda?", answer: "Proses kami mengikuti lima tahap: Penemuan, Desain Konsep, Pengembangan Desain, Dokumen Konstruksi, dan Administrasi Konstruksi. Setiap tahap melibatkan kolaborasi erat dengan klien dan konsultan.", category: "Proses" },
  { question: "Berapa lama waktu yang dibutuhkan untuk sebuah proyek?", answer: "Jadwal bervariasi sesuai lingkup. Hunian kustom biasanya memakan waktu 12–18 bulan dari konsep hingga penyelesaian. Proyek komersial yang lebih besar dapat memakan waktu 24–36 bulan.", category: "Proses" },
  { question: "Bagaimana sistem pembayaran untuk layanan Anda?", answer: "Kami menawarkan struktur berbasis persentase dan biaya tetap tergantung pada lingkup proyek. Konsultasi awal gratis untuk mendiskusikan kebutuhan dan anggaran Anda.", category: "Proses" },
  { question: "Apakah Anda menyediakan perkiraan biaya?", answer: "Ya. Kami menyediakan perkiraan biaya terperinci selama pengembangan desain, bekerja sama dengan quantity surveyor dan kontraktor.", category: "Proses" },
];

const collaborationFAQ: FAQItem[] = [
  { question: "Bagaimana cara memulai proyek dengan firma Anda?", answer: "Hubungi kami melalui formulir kontak atau telepon. Kami akan menjadwalkan konsultasi awal untuk mendiskusikan visi, kebutuhan, dan anggaran Anda.", category: "Kolaborasi" },
  { question: "Informasi apa yang Anda butuhkan untuk memberikan proposal?", answer: "Kami biasanya membutuhkan brief proyek, informasi lahan, kisaran anggaran, dan ekspektasi jadwal. Semakin detail yang Anda bagikan, semakin akurat proposal kami.", category: "Kolaborasi" },
  { question: "Apakah Anda bekerja dengan konsultan eksternal?", answer: "Ya. Kami berkolaborasi dengan jaringan insinyur struktur, konsultan MEP, desainer interior, arsitek lansekap, dan ahli keberlanjutan yang terpercaya.", category: "Kolaborasi" },
  { question: "Dapatkah Anda merekomendasikan kontraktor?", answer: "Ya. Kami menjaga daftar kontraktor terkurasi yang bereputasi baik dan memiliki komitmen terhadap kualitas dan keahlian.", category: "Kolaborasi" },
];

const allFAQ = [...generalFAQ, ...processFAQ, ...collaborationFAQ];

export default function FAQPage() {
  return (
    <>
      <JsonLdScript data={createFAQPageSchema(allFAQ)} id="faq-schema" />
      <section className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <FAQSearch items={allFAQ} />
          </div>
        </div>
      </section>
      <FAQAccordion
        title="Pertanyaan yang Sering Diajukan"
        description="Jawaban atas pertanyaan umum tentang layanan, proses, dan kolaborasi kami."
        items={allFAQ}
      />
      <CategoryFAQ
        title="Jelajahi Berdasarkan Kategori"
        description="Pilih kategori untuk menemukan jawaban dengan cepat."
        categories={[
          { label: "Umum", items: generalFAQ },
          { label: "Proses", items: processFAQ },
          { label: "Kolaborasi", items: collaborationFAQ },
        ]}
      />
      <CTADefault
        title="Masih Punya Pertanyaan?"
        description="Setiap proyek itu unik. Hubungi tim kami dan kami akan menjawab secara pribadi setiap pertanyaan tentang kebutuhan spesifik Anda."
        primaryCta={{ label: "Hubungi Tim Kami", href: "/contact" }}
      />
    </>
  );
}