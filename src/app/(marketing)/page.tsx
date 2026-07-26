import { AnimatedSection } from "@/components/animation";
import { HeroSection, FeaturedProjects, ServicesGrid, ProcessSteps, StatisticsShowcase, ClientReviews, CTADefault, Values } from "@/sections";
import { createMetadata, createWebPageSchema, JsonLdScript } from "@/seo";
import type { PortfolioItem, ServiceItem, ProcessStep, StatItem, TestimonialItem, ValueItem } from "@/sections";
import { Search, Lightbulb, PenTool, HardHat, Award, Users, Building2, Globe } from "lucide-react";

export const metadata = createMetadata({
  title: "Arsitek & Konsultan Properti Terpercaya di Aceh",
  description: "PT Karya Nusantara Realty — praktik arsitektur dan properti berbasis di Aceh, Indonesia. Lebih dari 200 proyek residensial mewah, komersial, hospitality, dan master plan sejak 2010.",
});

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residensial", image: { src: "/images/portfolio/villa-sky.jpg", alt: "Vila megah di ketinggian Bali" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Komersial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Cakar langit perkantoran di pusat Jakarta" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Resor tepi pantai di Lombok" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Plan", image: { src: "/images/portfolio/green-valley.jpg", alt: "Kawasan hunian terpadu di Bandung" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residensial", image: { src: "/images/portfolio/sanctuary.jpg", alt: "Vila eksklusif di jantung Ubud" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Klub tepi laut di Singapura" }, href: "/portfolio/marina-club", location: "Singapura", year: "2025" },
];

const services: ServiceItem[] = [
  { title: "Arsitektur Residensial", description: "Kediaman pribadi yang dirancang dengan kepekaan mendalam terhadap jiwa penghuni dan karakter tapak. Bukan sekadar rumah, melainkan cerminan identitas yang hidup lintas generasi.", features: [], image: { src: "/images/services/residential.jpg", alt: "Arsitektur Residensial" } },
  { title: "Arsitektur Komersial", description: "Ruang niaga dan perkantoran yang menginspirasi produktivitas dan konektivitas, dirancang dengan pendekatan visioner yang memperkuat identitas merek.", features: [], image: { src: "/images/services/commercial.jpg", alt: "Arsitektur Komersial" } },
  { title: "Desain Hospitality", description: "Pengalaman menginap, bersantap, dan bersantai yang tak terlupakan, dirangkai melalui orkestrasi ruang, cahaya, dan material yang cermat.", features: [], image: { src: "/images/services/hospitality.jpg", alt: "Desain Hospitality" } },
  { title: "Master Plan", description: "Perencanaan kawasan berskala besar yang menyeimbangkan visi pengembangan dengan kelestarian alam dan kualitas hidup komunitas secara berkelanjutan.", features: [], image: { src: "/images/services/master-planning.jpg", alt: "Master Plan" } },
];

const steps: ProcessStep[] = [
  { title: "Eksplorasi", description: "Menyelami visi, aspirasi, dan karakter unik tapak untuk menemukan esensi terdalam dari setiap proyek.", icon: <Search size={20} /> },
  { title: "Konseptualisasi", description: "Menerjemahkan gagasan besar menjadi bahasa visual yang puitis melalui sketsa, mood board, dan studi model.", icon: <Lightbulb size={20} /> },
  { title: "Pengembangan", description: "Menyempurnakan setiap detail — material, proporsi, sistem pencahayaan, dan keselarasan anggaran dengan cita rasa tinggi.", icon: <PenTool size={20} /> },
  { title: "Realisasi", description: "Pengawasan desain yang ketat untuk memastikan setiap milimeter bangunan adalah cerminan setia dari cetak biru.", icon: <HardHat size={20} /> },
];

const trustValues: ValueItem[] = [
  { title: "Pengalaman Terbukti", description: "Lebih dari 15 tahun menghadirkan arsitektur kelas dunia — 200+ proyek terselesaikan di Asia Tenggara, masing-masing adalah bukti komitmen pada keunggulan.", icon: <Award size={20} /> },
  { title: "Tim Profesional", description: "Multidisiplin yang terdiri dari arsitek, desainer interior, dan ahli konstruksi yang telah berpengalaman menangani proyek-proyek bergengsi.", icon: <Users size={20} /> },
  { title: "Portofolio Premium", description: "Karya kami mencakup residensial mewah, komersial ikonik, hospitality eksklusif, dan kawasan terpadu yang telah diakui secara internasional.", icon: <Building2 size={20} /> },
  { title: "Jangkauan Global", description: "Melayani klien di 8 negara dengan standar internasional, didukung oleh mitra dan jaringan profesional global yang solid.", icon: <Globe size={20} /> },
];

const stats: StatItem[] = [
  { value: "200", label: "Proyek Terselesaikan", suffix: "+" },
  { value: "50", label: "Penghargaan Bergengsi", suffix: "+" },
  { value: "15", label: "Tahun Pengabdian" },
  { value: "8", label: "Negara Dijangkau" },
];

const testimonials: TestimonialItem[] = [
  { name: "James Thompson", role: "CEO", company: "Harmony Developments", content: "PT Karya Nusantara Realty melampaui ekspektasi kami. Dedikasi mereka terhadap detail dan keunggulan desain sungguh tak tertandingi. Setiap sudut bangunan yang mereka ciptakan berbicara dalam bahasa keindahan.", avatar: { src: "/images/testimonials/james.jpg", alt: "James Thompson" }, rating: 5 },
  { name: "Miyako Tanaka", role: "Direktur", company: "Luxury Retreats Asia", content: "Bekerja bersama tim ini adalah pengalaman yang luar biasa. Mereka tidak sekadar memahami visi kami, melainkan turut menyempurnakannya. Resort yang mereka hadirkan telah menjadi ikon destinasi.", avatar: { src: "/images/testimonials/miyako.jpg", alt: "Miyako Tanaka" }, rating: 5 },
  { name: "David Chen", role: "Pendiri", company: "Chen Properties", content: "Tim arsitek paling berbakat yang pernah kami ajak bekerja sama di Asia Tenggara. Vila pribadi kami menerima pujian tanpa henti — dan setiap pujian itu layak diberikan.", avatar: { src: "/images/testimonials/david.jpg", alt: "David Chen" }, rating: 5 },
];

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "PT Karya Nusantara Realty — Arsitek & Konsultan Properti di Aceh",
        description: "Praktik arsitektur dan properti berbasis di Aceh, Indonesia. Spesialis desain residensial mewah, komersial, hospitality, dan master plan.",
        url: "/",
      })} id="webpage-schema" />
<HeroSection
        title="Merancang Keabadian dalam Setiap Sudut"
        subtitle="PT Karya Nusantara Realty"
        description="Kami adalah biro arsitektur yang percaya bahwa setiap bangunan memiliki jiwa. Dari Nusantara, kami merajut karya-karya yang melampaui batas geografis dan generasi."
        background={{ src: "/images/hero/home-hero.jpg", alt: "Karya arsitektur yang melampaui batas waktu" }}
        actions={[
          { label: "Jelajahi Portofolio", href: "/portfolio", variant: "primary" },
          { label: "Mulai Perbincangan", href: "/contact", variant: "outline" },
        ]}
      />
      <AnimatedSection>
        <FeaturedProjects
          title="Karya Unggulan"
          description="Setiap proyek adalah babak dalam narasi besar kami. Berikut adalah sepenggal kisah dari perjalanan panjang merancang keindahan."
          projects={projects.slice(0, 6)}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StatisticsShowcase
          title="Perjalanan dalam Angka"
          description="Di balik setiap angka tersimpan cerita dedikasi, ketekunan, dan hasrat akan keindahan."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ServicesGrid
          title="Layanan Kami"
          description="Spektrum layanan arsitektur yang utuh, dari konsepsi hingga realisasi, dirancang untuk mewujudkan visi Anda dengan sempurna."
          services={services}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ProcessSteps
          title="Metodologi Kami"
          description="Setiap langkah adalah bagian dari ritme yang telah kami sempurnakan selama bertahun-tahun, memastikan hasil akhir yang tak tertandingi."
          steps={steps}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <Values
          label="Mengapa Memilih Kami"
          title="Keunggulan yang Membuat Klien Kembali"
          description="Bertahun-tahun kepercayaan dari klien premium tidak terjadi secara kebetulan — ini adalah hasil dari konsistensi, integritas, dan keunggulan."
          values={trustValues}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <ClientReviews
          title="Kata Mereka"
          description="Kepercayaan adalah fondasi terkuat dalam setiap kolaborasi. Berikut adalah pengalaman mereka yang telah berlayar bersama kami."
          testimonials={testimonials}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <CTADefault
          title="Mulailah Perjalanan Arsitektur Anda"
          description="Setiap mahakarya berawal dari sebuah percakapan. Izinkan kami mendengarkan visi Anda, dan bersama-sama kita wujudkan karya yang akan dikenang sepanjang masa."
          primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
          secondaryCta={{ label: "Jelajahi Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}
