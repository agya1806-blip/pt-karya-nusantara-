import { AnimatedSection } from "@/components/animation";
import { ServiceOverview, ServicesGrid, ProcessSteps, ConsultationCTA, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createServiceSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import { siteConfig } from "@/config";
import type { ServiceItem, ProcessStep } from "@/sections";
import { Search, Lightbulb, PenTool, FileText, HardHat } from "lucide-react";

export const metadata = createMetadata({
  title: "Layanan Arsitektur & Desain",
  description: "Kami menjembatani visi dan wujud — setiap layanan adalah perjalanan dari gagasan menjadi ruang yang hidup, bernapas, dan dikenang sepanjang masa.",
});

const services: ServiceItem[] = [
  { title: "Arsitektur Residensial", description: "Rumah bukan sekadar tempat berteduh — ia adalah cermin jiwa penghuninya, perpanjangan dari cara kita mencintai dan dihidupi. Kami merancang hunian, vila, dan kediaman pribadi yang lahir dari dialog intim antara Anda, lahan, dan cahaya. Setiap ruang adalah puisi yang ditulis dalam bahan, proporsi, dan keheningan.", features: ["Desain Hunian yang Dipersonalisasi", "Renovasi & Restorasi Penuh Kepekaan", "Interior Arsitektural yang Menyatu", "Dialog dengan Lansekap & Tapak"], image: { src: "/images/services/residential.jpg", alt: "Arsitektur residensial mewah" }, href: "/services/residential" },
  { title: "Arsitektur Komersial", description: "Sebuah bangunan komersial adalah pernyataan diam tentang nilai dan karakter merek Anda. Kami merancang kantor, ritel, dan kawasan mixed-use yang bukan hanya fungsional — tetapi juga mengundang, menginspirasi, dan dikenang. Di setiap persimpangan lalu lintas manusia, kami menempatkan keindahan yang meladeni.", features: ["Gedung & Kantor Korporat", "Ritel & Pengalaman Berbelanja", "Kawasan Mixed-Use Terpadu", "Strategi Tempat Kerja Masa Depan"], image: { src: "/images/services/commercial.jpg", alt: "Arsitektur komersial" }, href: "/services/commercial" },
  { title: "Desain Hospitality", description: "Kami percaya bahwa sebuah resor atau hotel sejati bukanlah tempat menginap — melainkan tujuan yang mengubah cara kita merasakan waktu. Dari lobi hingga kamar terakhir, setiap detail dirancang untuk membelai indra, merawat kelelahan, dan menyisakan kenangan yang tak mudah pudar.", features: ["Destinasi Resor Eksklusif", "Hotel Butik & Bertema", "Restoran & Ruang Sosial", "Spa & Pusat Kebugaran"], image: { src: "/images/services/hospitality.jpg", alt: "Desain hospitality" }, href: "/services/hospitality" },
  { title: "Master Plan", description: "Membangun bukan sekadar menata massa di atas lahan — melainkan menghidupi tanah dengan cara yang beradab. Kami merencanakan kawasan, komunitas, dan kota kecil dengan pendekatan yang menghormati ekologi, sejarah, dan dinamika sosial. Sebuah master plan yang baik adalah janji pada generasi yang belum lahir.", features: ["Analisis Tapak & Konteks", "Desain Urban yang Manusiawi", "Infrastruktur & Konektivitas", "Strategi Keberlanjutan Jangka Panjang"], image: { src: "/images/services/master-planning.jpg", alt: "Master plan" }, href: "/services/master-planning" },
  { title: "Desain Interior", description: "Interior adalah panggung kehidupan sehari-hari. Kami menciptakan ruang dalam yang berbicara dalam bahasa bahan, cahaya, dan proporsi — ruang yang terasa seperti pelukan, bukan sekadar latar. Dari pemilihan material hingga kurasi furnitur, setiap elemen adalah catatan dalam simfoni visual yang utuh.", features: ["Tata Ruang yang Mengalir", "Materialitas & Tekstur Kuratorial", "Furnitur & Elemen Kustom", "Cahaya sebagai Bahan Desain"], image: { src: "/images/services/interior.jpg", alt: "Desain interior" }, href: "/services/interior" },
  { title: "Desain Berkelanjutan", description: "Bagi kami, keberlanjutan bukanlah sekadar label atau sertifikasi — melainkan sikap dasar terhadap kehidupan. Kami mengintegrasikan strategi pasif, material rendah karbon, dan sistem hemat energi sebagai fondasi, bukan tempelan. Merancang untuk umur panjang adalah bentuk tanggung jawab tertinggi seorang arsitek.", features: ["Strategi Desain Pasif", "Pemodelan & Simulasi Energi", "Material dengan Jejak Karbon Rendah", "Sertifikasi Bangunan Hijau"], image: { src: "/images/services/sustainable.jpg", alt: "Arsitektur berkelanjutan" }, href: "/services/sustainable" },
];

const workflowSteps: ProcessStep[] = [
  { title: "Penemuan", description: "Kami memulai dengan keheningan — menyimak visi, mimpi, dan karakter unik lahan Anda. Pertemuan pertama ini adalah fondasi di mana seluruh perjalanan desain dibangun, dengan rasa ingin tahu yang tak terbatas.", icon: <Search size={20} /> },
  { title: "Desain Konsep", description: "Gagasan mulai merangkai wujud. Melalui sketsa, mood board, dan model studi, kami menerjemahkan aspirasi menjadi narasi spasial yang dapat Anda lihat, rasakan, dan sempurnakan bersama kami.", icon: <Lightbulb size={20} /> },
  { title: "Pengembangan Desain", description: "Ketika esensi telah ditangkap, kami mengukir detail dengan ketelitian seorang pengrajin — material, proporsi, sistem, dan anggaran diselaraskan dalam harmoni yang penuh kesadaran.", icon: <PenTool size={20} /> },
  { title: "Dokumen Konstruksi", description: "Setiap keputusan desain didokumentasikan dalam gambar dan spesifikasi yang presisi — bahasa teknis yang menjembatani visi dengan realitas, memastikan tidak ada nuansa yang hilang dalam penerjemahan.", icon: <FileText size={20} /> },
  { title: "Administrasi Konstruksi", description: "Kami hadir di setiap tahap pembangunan — mengawal dengan saksama agar setiap material terpasang dengan benar, setiap detail terwujud sesuai janji desain, hingga kunci diserahkan pada pemiliknya.", icon: <HardHat size={20} /> },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Layanan Arsitektur & Desain",
        description: "Perjalanan dari gagasan menjadi ruang yang hidup — spektrum penuh layanan arsitektur, desain interior, dan konsultasi properti.",
        url: "/services",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Layanan" },
      ])} id="breadcrumb-schema" />
      {services.map((service, index) => (
        <JsonLdScript
          key={service.title}
          data={createServiceSchema({
            name: service.title,
            description: service.description,
            image: service.image?.src,
            providerName: siteConfig.name,
          })}
          id={`service-schema-${index}`}
        />
      ))}
      <AnimatedSection>
        <ServiceOverview
          title="Layanan Kami"
          description="Dari bisikan pertama hingga kunci terakhir — setiap komisi mendapat kedalaman perhatian yang utuh dari studio kami. Sebuah dedikasi yang tak terlihat, namun terasa dalam setiap sentuhan akhir."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ServicesGrid title="Layanan Kami" description="Spektrum penuh kemampuan arsitektur dan desain — diantarkan dengan standar keunggulan yang tidak pernah kami tawar." services={services} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProcessSteps title="Metodologi Kami" steps={workflowSteps} />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ConsultationCTA
          title="Jadwalkan Percakapan"
          description="Ceritakan tentang proyek Anda dalam pertemuan yang dirancang khusus untuk mendengar — bukan menjual."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Bingung Hendak Memulai?"
          description="Sampaikan garis besar proyek Anda, dan kami akan merekomendasikan pendekatan yang paling bermakna — tanpa biaya, tanpa tekanan."
          primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}
