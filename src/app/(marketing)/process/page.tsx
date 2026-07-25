import { ProcessSteps, Timeline, ConsultationProcess, ConstructionFlow, ProjectLifecycle } from "@/sections";
import { createMetadata } from "@/seo";
import type { ProcessStep, TimelineEvent } from "@/sections";

export const metadata = createMetadata({
  title: "Proses Kami",
  description: "Temukan bagaimana PT Karya Nusantara Realty mengubah visi menjadi mahakarya arsitektur melalui proses desain dan konstruksi yang teruji.",
});

const steps: ProcessStep[] = [
  { title: "Penemuan & Briefing", description: "Kami melakukan diskusi mendalam untuk memahami visi, kebutuhan, anggaran, dan jadwal Anda." },
  { title: "Analisis Lahan", description: "Tim kami melakukan evaluasi lahan menyeluruh, termasuk topografi, iklim, orientasi, dan peraturan." },
  { title: "Desain Konsep", description: "Kami mengembangkan konsep desain awal, sketsa, dan mood board untuk review dan masukan Anda." },
  { title: "Pengembangan Desain", description: "Konsep yang dipilih disempurnakan dengan gambar detail, pemilihan material, dan perkiraan biaya." },
  { title: "Dokumen Konstruksi", description: "Gambar teknis dan spesifikasi komprehensif disiapkan untuk perizinan dan tender kontraktor." },
  { title: "Administrasi Konstruksi", description: "Kami mengawasi konstruksi, melakukan kunjungan lapangan, dan memastikan visi desain dijalankan dengan setia." },
];

const timelineEvents: TimelineEvent[] = [
  { year: "Bulan 1-2", title: "Fase Penemuan", description: "Konsultasi awal, kunjungan lahan, dan pengembangan brief proyek." },
  { year: "Bulan 3-4", title: "Desain Konsep", description: "Desain skematis, mood board, dan anggaran pendahuluan." },
  { year: "Bulan 5-8", title: "Pengembangan Desain", description: "Gambar detail, pemilihan material, dan anggaran akhir." },
  { year: "Bulan 9-12", title: "Dokumentasi & Perizinan", description: "Dokumen konstruksi dan aplikasi izin bangunan." },
  { year: "Bulan 13+", title: "Konstruksi", description: "Administrasi konstruksi dan penyelesaian proyek." },
];

export default function ProcessPage() {
  return (
    <>
      <ProcessSteps
        title="Cara Kami Bekerja"
        description="Proses teruji kami memastikan setiap proyek diantarkan dengan standar kualitas dan perhatian terhadap detail tertinggi."
        steps={steps}
      />
      <Timeline
        title="Jadwal Proyek"
        events={timelineEvents}
      />
      <ConsultationProcess
        title="Proses Konsultasi"
        description="Proses konsultasi kami memastikan setiap detail tertangkap sebelum kami memulai perjalanan desain."
        steps={[
          { step: 1, title: "Permintaan Awal", description: "Hubungi kami melalui formulir kontak atau telepon untuk menyatakan minat Anda." },
          { step: 2, title: "Panggilan Penemuan", description: "Panggilan 30 menit untuk memahami lingkup proyek, visi, dan anggaran Anda." },
          { step: 3, title: "Kunjungan Lahan", description: "Tim kami mengunjungi lahan Anda untuk menilai kondisi dan mengumpulkan pengukuran." },
          { step: 4, title: "Proposal", description: "Kami memberikan proposal yang disesuaikan dengan lingkup, jadwal, dan struktur biaya." },
        ]}
      />
      <ConstructionFlow
        title="Alur Konstruksi"
        description="Pendekatan bertahap kami terhadap konstruksi memastikan kualitas di setiap tahap."
      />
      <ProjectLifecycle
        title="Siklus Hidup Proyek"
        description="Dari awal hingga penyelesaian, kami memandu proyek Anda melalui setiap fase."
      />
    </>
  );
}