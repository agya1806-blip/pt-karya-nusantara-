import { ProcessSteps, Timeline, ConsultationProcess, ConstructionFlow, ProjectLifecycle } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { ProcessStep, TimelineEvent } from "@/sections";
import { Search, Lightbulb, Ruler, PenTool, FileText, HardHat } from "lucide-react";

export const metadata = createMetadata({
  title: "Metodologi Desain & Proses Arsitektur",
  description: "Pelajari metodologi desain arsitektur PT Karya Nusantara Realty — dari konsultasi awal, eksplorasi desain, dokumentasi konstruksi, hingga pengawasan pembangunan.",
});

const steps: ProcessStep[] = [
  { title: "Penemuan & Perumusan Visi", description: "Dialog intim untuk menangkap esensi aspirasi Anda — merangkum narasi, kebutuhan, dan ambisi ruang.", icon: <Search size={20} /> },
  { title: "Teliti Lahan & Konteks", description: "Kajian menyeluruh terhadap topografi, mikroklimat, orientasi matahari, serta regulasi tapak sebagai fondasi desain.", icon: <Ruler size={20} /> },
  { title: "Gagasan & Purwarupa", description: "Lahirnya sketsa awal, mood board kuratif, dan konsep yang mewadahi imajinasi Anda dalam bentuk visual.", icon: <Lightbulb size={20} /> },
  { title: "Penajaman & Detailisasi", description: "Konsep terpilih diperhalus menjadi gambar presisi, spesifikasi material terkurasi, dan estimasi biaya mendalam.", icon: <PenTool size={20} /> },
  { title: "Dokumentasi Konstruksi", description: "Paket gambar teknis dan spesifikasi komprehensif yang menjadi acuan mutlak bagi perizinan dan pelaksanaan.", icon: <FileText size={20} /> },
  { title: "Pengawasan Konstruksi", description: "Kehadiran kami di lapangan memastikan setiap detail desain dieksekusi dengan kesetiaan mutlak terhadap visi awal.", icon: <HardHat size={20} /> },
];

const timelineEvents: TimelineEvent[] = [
  { year: "Bulan 1–2", title: "Riset & Perumusan", description: "Konsultasi perdana, survei tapak, dan penyusunan brief proyek yang menjadi cetak biru visi Anda." },
  { year: "Bulan 3–4", title: "Eksplorasi Bentuk", description: "Skematik desain, mood board kuratif, dan studi anggaran awal." },
  { year: "Bulan 5–8", title: "Pematangan Desain", description: "Gambar detail, seleksi material ketat, dan finalisasi anggaran." },
  { year: "Bulan 9–12", title: "Dokumentasi & Izin", description: "Penyusunan dokumen konstruksi lengkap dan pengurusan izin mendirikan bangunan." },
  { year: "Bulan 13+", title: "Ereksi & Penyelesaian", description: "Pengawasan konstruksi aktif hingga serah terima karya yang sempurna." },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Metodologi Desain Arsitektur — PT Karya Nusantara Realty",
        description: "Proses desain arsitektur dari konsultasi awal, eksplorasi konsep, pengembangan desain, dokumentasi konstruksi, hingga pengawasan pembangunan.",
        url: "/process",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Proses" },
      ])} id="breadcrumb-schema" />
      <ProcessSteps
        title="Tahapan Karya"
        description="Setiap mahakarya melalui rangkaian proses yang terukur — dari percakapan pertama hingga sentuhan terakhir."
        steps={steps}
      />
      <Timeline
        title="Cakrawala Waktu"
        events={timelineEvents}
      />
      <ConsultationProcess
        title="Tata Cara Konsultasi"
        description="Kami percaya bahwa desain agung lahir dari pemahaman yang utuh. Konsultasi awal adalah fondasi dari segalanya."
        steps={[
          { step: 1, title: "Minat & Pengantar", description: "Sampaikan niat Anda melalui kanal kontak kami. Tim kami akan merespons dalam 24 jam." },
          { step: 2, title: "Dialog Penjajakan", description: "Percakapan intensif selama 30–60 menit untuk menggali visi, lingkup, serta kisaran anggaran Anda." },
          { step: 3, title: "Ekspedisi Tapak", description: "Arsitek kami melakukan visitasi langsung ke lahan untuk merasakan karakter dan potensi tapak." },
          { step: 4, title: "Proposal Khusus", description: "Kami menghadirkan proposal yang dirancang khusus — mencakup lingkup, jadwal, dan struktur honorarium." },
        ]}
      />
      <ConstructionFlow
        title="Alur Pelaksanaan"
        description="Setiap fase konstruksi dikelola dengan presisi tinggi dan pengendalian mutu yang ketat."
      />
      <ProjectLifecycle
        title="Perjalanan Karya"
        description="Dari aspirasi awal hingga penghunian, kami mendampingi setiap langkah dengan dedikasi penuh."
      />
    </>
  );
}