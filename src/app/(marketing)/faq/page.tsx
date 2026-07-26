import { FAQAccordion, CategoryFAQ, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createFAQPageSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import { FAQSearch } from "./faq-search";
import type { FAQItem } from "@/sections";

export const metadata = createMetadata({
  title: "Tanya Kami — FAQ",
  description: "Jawaban atas pertanyaan yang sering diajukan seputar layanan arsitektur, proses desain, biaya, dan kemitraan dengan Karya Nusantara Realty.",
});

const generalFAQ: FAQItem[] = [
  { question: "Jenis proyek apa yang menjadi keahlian Karya Nusantara Realty?", answer: "Kami mengkhususkan diri pada arsitektur residensial premium, komersial, hospitality, dan master plan. Portofolio kami merentang dari vila pribadi dan rumah kustom hingga hotel butik, pengembangan mixed-use, dan kawasan terencana. Setiap proyek didekati dengan tingkat personalisasi yang setara.", category: "Umum" },
  { question: "Di mana basis studio Anda?", answer: "Studio utama kami berlokasi di Banda Aceh, Indonesia. Meski demikian, kami melayani klien dari berbagai kota dan negara — baik secara tatap muka maupun jarak jauh melalui koordinasi digital yang intensif.", category: "Umum" },
  { question: "Apa filosofi yang menuntun setiap desain Anda?", answer: "Kami percaya pada arsitektur yang abadi — ruang yang tidak hanya indah secara visual, tetapi juga berakar pada konteks, merayakan budaya setempat, dan mengakomodasi aspirasi penghuninya. Setiap garis, material, dan cahaya memiliki tujuan.", category: "Umum" },
  { question: "Apakah Anda menerima proyek dari luar Indonesia?", answer: "Tentu. Kami telah menangani proyek di berbagai negara Asia Tenggara — Singapura, Malaysia, Thailand, dan lainnya. Kolaborasi lintas batas adalah salah satu keahlian yang kami banggakan.", category: "Umum" },
];

const processFAQ: FAQItem[] = [
  { question: "Seperti apa alur proses desain di studio Anda?", answer: "Metodologi kami terdiri dari enam tahap: Penemuan & Perumusan Visi, Teliti Lahan & Konteks, Gagasan & Purwarupa, Penajaman & Detailisasi, Dokumentasi Konstruksi, dan Pengawasan Konstruksi. Setiap tahap melibatkan kolaborasi erat dengan Anda dan konsultan pendamping.", category: "Proses" },
  { question: "Berapa lama waktu yang diperlukan untuk menyelesaikan sebuah proyek?", answer: "Durasi sangat tergantung pada lingkup dan kompleksitas. Sebuah hunian kustom biasanya memakan waktu 12–18 bulan dari konsep hingga serah terima. Proyek komersial atau hospitality berskala lebih besar dapat berlangsung 24–36 bulan. Kami akan menyusun jadwal realistis sejak awal.", category: "Proses" },
  { question: "Bagaimana skema pembayaran untuk jasa arsitektur?", answer: "Kami menawarkan struktur biaya yang fleksibel — baik berbasis persentase tahapan maupun biaya tetap — disesuaikan dengan lingkup dan skala proyek Anda. Konsultasi awal bersifat tanpa biaya sebagai bentuk penghargaan kami terhadap kepercayaan Anda.", category: "Proses" },
  { question: "Apakah estimasi biaya konstruksi disertakan?", answer: "Ya. Selama tahap pengembangan desain, kami menyusun estimasi biaya terperinci dengan melibatkan quantity surveyor dan kontraktor rekanan. Transparansi biaya adalah komitmen kami sejak awal.", category: "Proses" },
];

const collaborationFAQ: FAQItem[] = [
  { question: "Bagaimana langkah awal untuk bekerja sama dengan studio Anda?", answer: "Cukup sampaikan ketertarikan Anda melalui formulir kontak, telepon, atau WhatsApp. Tim kami akan menjadwalkan konsultasi awal — tanpa biaya — untuk mendiskusikan visi, kebutuhan, dan kisaran anggaran Anda.", category: "Kolaborasi" },
  { question: "Informasi apa yang perlu saya siapkan agar proposal lebih akurat?", answer: "Semakin lengkap, semakin presisi. Idealnya: brief proyek, data lahan (luas, lokasi, orientasi), kisaran anggaran, dan ekspektasi jadwal. Dokumen referensi visual juga sangat membantu.", category: "Kolaborasi" },
  { question: "Apakah Anda berkolaborasi dengan mitra profesional lain?", answer: "Kami memiliki jaringan tetap yang terdiri dari insinyur struktur, konsultan MEP, desainer interior, arsitek lansekap, dan ahli keberlanjutan — semuanya terkurasi dengan standar yang sejajar dengan kami.", category: "Kolaborasi" },
  { question: "Dapatkah Anda merekomendasikan kontraktor yang terpercaya?", answer: "Kami memelihara daftar kontraktor pilihan yang telah teruji kualitas dan komitmennya. Rekomendasi diberikan berdasarkan kesesuaian dengan skala dan kompleksitas proyek Anda.", category: "Kolaborasi" },
];

const allFAQ = [...generalFAQ, ...processFAQ, ...collaborationFAQ];

export default function FAQPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Tanya Kami — FAQ Arsitektur & Desain",
        description: "Jawaban atas pertanyaan seputar layanan arsitektur, proses desain, biaya, dan kolaborasi dengan Karya Nusantara Realty.",
        url: "/faq",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "FAQ" },
      ])} id="breadcrumb-schema" />
      <JsonLdScript data={createFAQPageSchema(allFAQ)} id="faq-schema" />
      <section className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <FAQSearch items={allFAQ} />
          </div>
        </div>
      </section>
      <FAQAccordion
        title="Pertanyaan Umum"
        description="Jawaban langsung dari studio kami untuk setiap pertanyaan yang mungkin Anda miliki."
        items={allFAQ}
      />
      <CategoryFAQ
        title="Telusuri per Kategori"
        description="Pilih kategori untuk menemukan jawaban yang Anda cari dengan lebih cepat."
        categories={[
          { label: "Umum", items: generalFAQ },
          { label: "Proses", items: processFAQ },
          { label: "Kolaborasi", items: collaborationFAQ },
        ]}
      />
      <CTADefault
        title="Tak Menemukan Jawabannya?"
        description="Setiap proyek memiliki keunikan tersendiri. Tim kami siap menjawab pertanyaan spesifik Anda secara personal."
        primaryCta={{ label: "Hubungi Langsung", href: "/contact" }}
      />
    </>
  );
}