import { Breadcrumb } from "@/components";
import { ServiceDetail, CTADefault, ProcessSteps, ClientReviews, StatisticsShowcase } from "@/sections";
import { createMetadata, createBreadcrumbSchema, JsonLdScript } from "@/seo";
import type { ServiceItem, ProcessStep, StatItem, TestimonialItem } from "@/sections";

const serviceProcesses: Record<string, ProcessStep[]> = {
  residential: [
    { title: "Konsultasi & Brief", description: "Memahami visi, gaya hidup, dan kebutuhan spesifik Anda melalui sesi diskusi mendalam." },
    { title: "Desain Konsep", description: "Menghadirkan 2-3 alternatif konsep desain yang menggabungkan estetika, fungsi, dan konteks lahan." },
    { title: "Pengembangan Desain", description: "Menyempurnakan setiap detail — material, pencahayaan, sirkulasi, dan integrasi lanskap." },
    { title: "Dokumen Konstruksi", description: "Menyusun gambar teknis dan spesifikasi yang presisi untuk proses tender dan pembangunan." },
    { title: "Pengawasan Konstruksi", description: "Memastikan setiap elemen terwujud sesuai desain melalui kunjungan dan koordinasi rutin." },
  ],
  commercial: [
    { title: "Analisis Kebutuhan", description: "Mempelajari brand, budaya perusahaan, dan kebutuhan operasional untuk merancang ruang yang produktif." },
    { title: "Konsep & Strategi", description: "Mengembangkan konsep arsitektur yang memperkuat identitas merek dan pengalaman pengguna." },
    { title: "Desain & Engineering", description: "Mengintegrasikan sistem MEP, struktur, dan interior dalam satu bahasa desain yang koheren." },
    { title: "Dokumentasi & Perizinan", description: "Menyusun dokumen teknis lengkap dan mengurus perizinan yang diperlukan." },
    { title: "Pelaksanaan & Serah Terima", description: "Mengawasi konstruksi hingga proyek siap digunakan." },
  ],
  hospitality: [
    { title: "Studi Kelayakan", description: "Menganalisis pasar, lokasi, dan potensi untuk menentukan konsep hospitality yang optimal." },
    { title: "Konsep Guest Journey", description: "Merancang pengalaman tamu dari arrival hingga departure melalui narasi spasial." },
    { title: "Desain Arsitektur & Interior", description: "Menyelaraskan arsitektur, interior, dan lanskap untuk menciptakan pengalaman yang immersive." },
    { title: "FF&E & OS&E", description: "Memilih furnitur, perlengkapan, dan peralatan yang sesuai dengan konsep dan standar operasional." },
    { title: "Supervisi & Soft Opening", description: "Mendampingi proses konstruksi, instalasi, dan persiapan operasional hingga grand opening." },
  ],
};

const commonStats: StatItem[] = [
  { value: "200", label: "Proyek Terselesaikan", suffix: "+" },
  { value: "50", label: "Penghargaan Desain", suffix: "+" },
  { value: "15", label: "Tahun Berpraktek" },
  { value: "8", label: "Negara Terjangkau" },
];

const sharedTestimonial: TestimonialItem = {
  name: "James Thompson",
  role: "CEO",
  company: "Harmony Developments",
  content: "PT Karya Nusantara Realty melampaui ekspektasi kami. Perhatian mereka terhadap detail dan komitmen terhadap keunggulan desain tidak tertandingi.",
  rating: 5,
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const serviceData: Record<string, ServiceItem> = {
  residential: {
    title: "Residential Architecture",
    description: "Bespoke homes, villas, and private residences — each conceived as a unique expression of its owner and site. Our residential work combines timeless sensibility with modern rigour.",
    features: ["Custom Home Design", "Renovation & Expansion", "Interior Architecture", "Landscape Integration", "Home Automation", "Sustainable Materials"],
    image: { src: "/images/services/residential-detail.jpg", alt: "Residential architecture detail" },
  },
  commercial: {
    title: "Commercial Architecture",
    description: "Office environments, retail spaces, and mixed-use developments designed to elevate brand identity and enrich user experience.",
    features: ["Office Buildings", "Retail Environments", "Mixed-Use Developments", "Workplace Strategy", "Brand Integration", "Adaptive Reuse"],
    image: { src: "/images/services/commercial-detail.jpg", alt: "Commercial architecture detail" },
  },
  hospitality: {
    title: "Hospitality Design",
    description: "Resorts, hotels, and restaurants where architecture shapes memory. Every detail is considered for its contribution to the guest journey.",
    features: ["Resort Design", "Hotel Architecture", "Restaurant & Bar", "Spa & Wellness", "Guest Experience Design", "FF&E Specification"],
    image: { src: "/images/services/hospitality-detail.jpg", alt: "Hospitality design detail" },
  },
  "master-planning": {
    title: "Master Planning",
    description: "Strategic site planning and urban design for large-scale developments. Master plans that balance density, ecology, infrastructure, and a sense of place.",
    features: ["Site Analysis", "Urban Design", "Infrastructure Planning", "Sustainability Strategy", "Zoning & Compliance", "Community Development"],
    image: { src: "/images/services/master-planning-detail.jpg", alt: "Master planning detail" },
  },
  "interior-design": {
    title: "Interior Design",
    description: "Interiors of character — where material, proportion, and light are orchestrated to create spaces that feel as refined as they are inhabitable.",
    features: ["Spatial Planning", "Material Selection", "Custom Furniture", "Lighting Design", "Colour Consultation", "Art Curation"],
    image: { src: "/images/services/interior-detail.jpg", alt: "Interior design detail" },
  },
  "sustainable-design": {
    title: "Sustainable Design",
    description: "Architecture that honours its environment. Low-carbon strategies, passive systems, and material stewardship — without compromising design calibre.",
    features: ["Passive Design", "Energy Modelling", "Material Sourcing", "Green Certification", "Water Conservation", "Waste Reduction"],
    image: { src: "/images/services/sustainable-detail.jpg", alt: "Sustainable design detail" },
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return createMetadata({ title: "Service Not Found" });
  return createMetadata({ title: service.title, description: service.description });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceData[slug] ?? {
    title: "Service Not Found",
    description: "The requested service could not be found.",
    features: [],
    image: { src: "", alt: "" },
  };

  const serviceProcess = serviceProcesses[slug] ?? [];
  const showProcess = serviceProcess.length > 0;

  return (
    <>
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Layanan", href: "/services" },
        { name: service.title },
      ])} id="breadcrumb-schema" />
      <div className="container-site pt-28 pb-4">
        <Breadcrumb
          items={[
            { label: "Layanan", href: "/services" },
            { label: service.title },
          ]}
        />
      </div>
      <ServiceDetail {...service} />
      {showProcess && (
        <ProcessSteps
          title="Proses Kami"
          description="Pendekatan terstruktur yang memastikan setiap proyek berjalan tepat waktu, tepat anggaran, dan sesuai ekspektasi."
          steps={serviceProcess}
        />
      )}
      <StatisticsShowcase
        title="Mengapa Memilih Kami"
        description="Rekam jejak yang menjadi alasan klien mempercayakan proyek mereka kepada kami."
        stats={commonStats}
      />
      <ClientReviews
        title="Kata Klien"
        description="Pengalaman mereka bekerja sama dengan kami."
        testimonials={[sharedTestimonial]}
        variant="grid"
      />
      <CTADefault
        title="Tertarik dengan Layanan Ini?"
        description="Hubungi tim kami untuk mendiskusikan bagaimana kami dapat membantu mewujudkan proyek Anda."
        primaryCta={{ label: "Diskusikan Proyek Anda", href: "/contact" }}
      />
    </>
  );
}
