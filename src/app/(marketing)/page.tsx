import { AnimatedSection } from "@/components/animation";
import { HeroSection, FeaturedProjects, ServicesGrid, ProcessSteps, StatisticsShowcase, ClientReviews, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { PortfolioItem, ServiceItem, ProcessStep, StatItem, TestimonialItem } from "@/sections";
import { Search, Lightbulb, PenTool, HardHat } from "lucide-react";

export const metadata = createMetadata();

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residensial", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Komersial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Plan", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residensial", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapura", year: "2025" },
];

const services: ServiceItem[] = [
  { title: "Arsitektur Residensial", description: "Hunian dan vila pribadi yang dirancang dengan standar desain dan kenyamanan tertinggi.", features: [], image: { src: "/images/services/residential.jpg", alt: "Arsitektur Residensial" } },
  { title: "Arsitektur Komersial", description: "Ruang kerja dan ritel yang memperkuat identitas merek melalui desain yang berkarakter.", features: [], image: { src: "/images/services/commercial.jpg", alt: "Arsitektur Komersial" } },
  { title: "Desain Hospitality", description: "Resor dan hotel yang menciptakan kesan abadi melalui narasi spasial yang terkurasi.", features: [], image: { src: "/images/services/hospitality.jpg", alt: "Desain Hospitality" } },
  { title: "Master Plan", description: "Strategi kawasan komprehensif yang menyeimbangkan visi, kepadatan, dan kepekaan konteks.", features: [], image: { src: "/images/services/master-planning.jpg", alt: "Master Plan" } },
];

const steps: ProcessStep[] = [
  { title: "Penemuan", description: "Memahami visi, aspirasi, dan karakter unik dari lahan Anda.", icon: <Search size={20} /> },
  { title: "Desain Konsep", description: "Menerjemahkan ide menjadi narasi spasial melalui sketsa, mood board, dan model studi.", icon: <Lightbulb size={20} /> },
  { title: "Pengembangan Desain", description: "Menyempurnakan setiap detail — material, proporsi, sistem, dan keselarasan anggaran.", icon: <PenTool size={20} /> },
  { title: "Konstruksi", description: "Pengawasan desain yang ketat untuk memastikan setiap elemen terwujud dengan presisi.", icon: <HardHat size={20} /> },
];

const stats: StatItem[] = [
  { value: "200", label: "Proyek Terselesaikan", suffix: "+" },
  { value: "50", label: "Penghargaan Desain", suffix: "+" },
  { value: "15", label: "Tahun Berpraktek" },
  { value: "8", label: "Negara Terjangkau" },
];

const testimonials: TestimonialItem[] = [
  { name: "James Thompson", role: "CEO", company: "Harmony Developments", content: "PT Karya Nusantara Realty melampaui ekspektasi kami. Perhatian mereka terhadap detail dan komitmen terhadap keunggulan desain tidak tertandingi.", avatar: { src: "/images/testimonials/james.jpg", alt: "James Thompson" }, rating: 5 },
  { name: "Miyako Tanaka", role: "Direktur", company: "Luxury Retreats Asia", content: "Bekerja dengan tim ini sangat menyenangkan. Mereka memahami visi kami dengan sempurna dan menghadirkan resor yang telah menjadi ikon.", avatar: { src: "/images/testimonials/miyako.jpg", alt: "Miyako Tanaka" }, rating: 5 },
  { name: "David Chen", role: "Pendiri", company: "Chen Properties", content: "Arsitek paling berbakat yang pernah kami ajak kerja sama di Asia Tenggara. Vila kami mendapat pujian yang tak terhitung jumlahnya.", avatar: { src: "/images/testimonials/david.jpg", alt: "David Chen" }, rating: 5 },
];

export default function HomePage() {
  return (
    <>
<HeroSection
        title="Menghadirkan Arsitektur yang Abadi"
        subtitle="PT Karya Nusantara Realty"
        description="Firma arsitektur mewah kelas dunia yang menciptakan ruang abadi untuk menginspirasi dan bertahan. Berbasis di Jakarta, melayani secara global."
        background={{ src: "/images/hero/home-hero.jpg", alt: "Pameran arsitektur mewah" }}
        actions={[
          { label: "Lihat Portofolio", href: "/portfolio", variant: "primary" },
          { label: "Hubungi Kami", href: "/contact", variant: "outline" },
        ]}
      />
      <AnimatedSection>
        <FeaturedProjects
          title="Proyek Pilihan"
          description="Kurasi karya terbaik kami — setiap proyek adalah bukti desain yang matang dan pengerjaan yang teliti."
          projects={projects.slice(0, 4)}
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
        <ServicesGrid
          title="Layanan Kami"
          description="Spektrum lengkap kemampuan arsitektur dan desain, masing-masing diantarkan dengan standar yang sama ketatnya."
          services={services}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ProcessSteps
          title="Cara Kami Bekerja"
          description="Proses disiplin yang mengubah visi menjadi realitas terbangun, dengan penuh pertimbangan dan tanpa kompromi."
          steps={steps}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <ClientReviews
          title="Kata Klien Kami"
          description="Suara dari mereka yang telah kami layani dengan penuh dedikasi."
          testimonials={testimonials}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <CTADefault
          title="Wujudkan Visi Anda"
          description="Setiap proyek besar dimulai dengan percakapan. Bagikan aspirasi Anda dan temukan kemungkinannya."
          primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
          secondaryCta={{ label: "Lihat Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}