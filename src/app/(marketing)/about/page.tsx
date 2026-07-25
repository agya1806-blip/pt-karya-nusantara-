import { AnimatedSection } from "@/components/animation";
import { CompanyOverview, VisionMission, Timeline, FounderStory, Values, Awards, StatisticsShowcase, TeamGrid, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { TimelineEvent, TeamMember, AwardItem, StatItem } from "@/sections";
import { Award, Leaf, HandshakeIcon, Palette } from "lucide-react";

export const metadata = createMetadata({
  title: "Tentang Kami",
  description: "Kenali kisah, visi, dan tim di balik PT Karya Nusantara Realty — praktik arsitektur dan desain yang berbasis di Aceh, Indonesia.",
});

const stats: StatItem[] = [
  { value: "200", label: "Proyek Terselesaikan", suffix: "+" },
  { value: "50", label: "Penghargaan Desain", suffix: "+" },
  { value: "15", label: "Tahun Berpraktek" },
  { value: "8", label: "Negara Terjangkau" },
];

const timelineEvents: TimelineEvent[] = [
  { year: "2010", title: "Berdiri", description: "PT Karya Nusantara Realty didirikan di Banda Aceh, didorong oleh keyakinan bahwa Indonesia layak mendapatkan arsitektur kelas tertinggi." },
  { year: "2013", title: "Proyek Internasional Pertama", description: "Komisi residensial di Singapura menandai keterlibatan lintas batas pertama kami, menetapkan standar untuk karya luar negeri di masa depan." },
  { year: "2016", title: "Ekspansi Studio", description: "Praktik berkembang untuk menampung tim multidisiplin, mencerminkan kompleksitas dan skala proyek yang semakin meningkat." },
  { year: "2019", title: "Tahun Penghargaan", description: "Beberapa penghargaan internasional mengakui ketelitian dan kehalusan portofolio residensial dan komersial kami." },
  { year: "2022", title: "Pengakuan Global", description: "Dinobatkan sebagai salah satu praktik arsitektur terkemuka di Asia Tenggara oleh media desain internasional." },
  { year: "2025", title: "Masa Depan Berkelanjutan", description: "Divisi keberlanjutan khusus dibentuk, meresmikan komitmen kami terhadap desain net-zero." },
];

const founders: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Lebih dari dua dekade membentuk lingkungan residensial dan komersial mewah di Indonesia dan Asia Tenggara." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Desainer pemenang penghargaan yang dikenal karena menjalin tradisi kerajinan Indonesia ke dalam bahasa arsitektur kontemporer." },
];

const teamMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Lebih dari dua dekade membentuk lingkungan residensial dan komersial mewah di Asia Tenggara." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Desainer pemenang penghargaan dengan pendekatan khas pada proyek residensial dan hospitality mewah kontemporer." },
  { name: "Budi Santoso", role: "Mitra Pengelola", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Memimpin strategi firma, kemitraan klien, dan operasional praktik dengan fokus pada pertumbuhan berkelanjutan." },
  { name: "Rina Wijaya", role: "Direktur Kreatif", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Memandu arahan kreatif studio, memastikan koherensi visi di seluruh proyek." },
  { name: "Dimas Prayogo", role: "Arsitek Senior", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Memimpin proyek residensial dan mixed-use dari konsep hingga konstruksi." },
  { name: "Maya Putri", role: "Arsitek Senior", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Spesialis desain berkelanjutan, sertifikasi bangunan hijau, dan material rendah karbon." },
  { name: "Alex Hartono", role: "Arsitek Proyek", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Berfokus pada proyek hospitality dan komersial dengan penekanan pada desain eksperiensial." },
  { name: "Lisa Tanudjaja", role: "Desainer Interior", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Desainer interior pemenang penghargaan yang dikenal menciptakan ruang hunian yang refined dan berkarakter." },
];

const awards: AwardItem[] = [
  { title: "Arsitektur Residensial Terbaik", year: "2023", description: "Asia Pacific Architecture Awards", organization: "APA" },
  { title: "Keunggulan Desain Bangunan Hijau", year: "2024", description: "International Sustainable Design Awards", organization: "ISDA" },
  { title: "Firma Tahun Ini", year: "2025", description: "Indonesia Architecture Excellence Awards", organization: "IAI" },
];

export default function AboutPage() {
  return (
    <>
      <AnimatedSection>
        <CompanyOverview
          title="Tentang PT Karya Nusantara Realty"
          description={[
            "Kami adalah praktik arsitektur dan desain yang berbasis di Aceh, melayani klien di Indonesia dan Asia Tenggara. Sejak 2010, kami telah menyelesaikan lebih dari 200 proyek — masing-masing ditentukan oleh komitmen terhadap keahlian, konteks, dan kualitas abadi.",
          ]}
          image={{ src: "/images/about/overview.jpg", alt: "Studio PT Karya Nusantara Realty" }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StatisticsShowcase
          title="Dalam Angka"
          description="Ukuran kepercayaan yang diberikan klien kepada kami."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <VisionMission
          title="Visi & Misi Kami"
          vision={{ title: "Visi Kami", description: "Menjadi praktik arsitektur terdepan di Indonesia — studio di mana ketelitian desain, kepekaan budaya, dan kepedulian lingkungan bersatu." }}
          mission={{ title: "Misi Kami", description: "Menciptakan ruang yang mengangkat pengalaman manusia — lingkungan yang indah, penuh tujuan, dan bernilai abadi." }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <Values
          title="Nilai-Nilai Kami"
          values={[
            { title: "Keunggulan Desain", description: "Komitmen tanpa kompromi terhadap keahlian, proporsi, dan integritas setiap detail.", icon: <Award size={18} /> },
            { title: "Praktik Berkelanjutan", description: "Pengelolaan material dan energi yang bertanggung jawab — mendesain untuk umur panjang, bukan tren.", icon: <Leaf size={18} /> },
            { title: "Kemitraan Klien", description: "Hubungan kolaboratif yang dibangun di atas mendengarkan dengan saksama dan memberikan dengan presisi.", icon: <HandshakeIcon size={18} /> },
            { title: "Warisan Budaya", description: "Penghormatan terhadap kerajinan Indonesia dan kearifan tradisi bangunan vernakular.", icon: <Palette size={18} /> },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <FounderStory founders={founders} />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Timeline title="Sejarah Kami" events={timelineEvents} />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <TeamGrid
          title="Tim Kami"
          description="Orang-orang di balik praktik kami — arsitek, desainer, dan ahli strategi yang dipersatukan oleh komitmen bersama terhadap keahlian."
          members={teamMembers}
          columns={4}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.7}>
        <Awards title="Penghargaan & Pengakuan" awards={awards} />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <CTADefault
          title="Wujudkan Visi Anda"
          description="Bagikan aspirasi proyek Anda dengan kami. Setiap desain hebat dimulai dengan percakapan."
          primaryCta={{ label: "Hubungi Kami", href: "/contact" }}
          secondaryCta={{ label: "Lihat Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}