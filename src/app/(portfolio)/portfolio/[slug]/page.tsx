import { Breadcrumb } from "@/components";
import { ProjectGallery, Awards, FeaturedProjects, ProjectDetailHeader, BeforeAfter, ProjectStatistics, CTADefault, ProcessSteps, ClientReviews, PartnersShowcase } from "@/sections";
import { createMetadata, createProjectSchema, createBreadcrumbSchema, createReviewSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { GalleryItem, AwardItem, PortfolioItem, StatItem, ProjectItem, MediaItem, ProcessStep, TestimonialItem, PartnerItem } from "@/sections";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface ProjectData {
  title: string;
  category: string;
  description: string;
  thumbnail: MediaItem;
  images: GalleryItem[];
  location: string;
  year: string;
  awards: string[];
  stats: StatItem[];
  process: ProcessStep[];
  testimonial?: TestimonialItem;
  partners?: PartnerItem[];
}

const projects: Record<string, ProjectData> = {
  "the-villa": {
    title: "The Sky Villa",
    category: "Residential",
    description: "Bertengger di lereng bukit selatan Bali, vila ini adalah monolog arsitektur yang larut dalam lanskap. Dinding kaca setinggi dua lantai membingkai panorama Samudra Hindia, sementara palet material — batu andesit lokal, kayu jati reclaimed, dan plester alami — menghadirkan tekstur autentik pulau ke dalam setiap ruang. Kolam infinity yang tampak menyatu dengan cakrawala menjadi poros spasial yang menyatukan interior dan eksterior.",
    thumbnail: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" },
    images: [
      { src: "/images/portfolio/villa-01.jpg", alt: "Main building exterior" },
      { src: "/images/portfolio/villa-02.jpg", alt: "Infinity pool view" },
      { src: "/images/portfolio/villa-03.jpg", alt: "Living room interior" },
      { src: "/images/portfolio/villa-04.jpg", alt: "Master bedroom" },
    ],
    location: "Bali, Indonesia",
    year: "2024",
    awards: ["Penghargaan Desain Residensial Terbaik, FIABCI Asia Pacific 2025", "Nominasi Aga Khan Award for Architecture 2025", "Sertifikasi Emas Green Building Council Indonesia 2024"],
    stats: [
      { value: "800", label: "Luas Bangunan", suffix: " m²" },
      { value: "4", label: "Kamar Tidur" },
      { value: "12", label: "Durasi Konstruksi", suffix: " bulan" },
      { value: "2024", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Analisis Tapak & Orientasi", description: "Mempelajari kontur perbukitan, lintasan matahari, dan koridor visual menuju samudra untuk menentukan posisi bangunan yang paling menghormati lanskap." },
      { title: "Konsep Arsitektur", description: "Merumuskan tiga bahasa desain yang berbeda — modern tropis, minimalis, dan kontemporer Bali — yang dimurnikan melalui dialog intensif dengan klien." },
      { title: "Pengembangan Desain", description: "Mendetailkan setiap ruang untuk menciptakan transisi tanpa batas antara dalam dan luar, dengan spesifikasi batu alam, kayu jati, dan material lokal yang dipilih secara kuratorial." },
      { title: "Pengawasan Konstruksi", description: "Berkolaborasi dengan pengrajin lokal untuk memastikan setiap detail — dari bibir kolam infinity hingga lanskap taman — memenuhi standar ketepatan yang telah ditetapkan." },
    ],
    testimonial: {
      name: "James Thompson",
      role: "Presiden Direktur",
      company: "Harmony Developments",
      content: "Mereka tidak sekadar membangun vila — mereka menciptakan pengalaman spasial yang mengubah cara saya memandang arsitektur. The Sky Villa adalah mahkota portofolio kami dan standar baru yang akan kami kejar di setiap proyek mendatang.",
      rating: 5,
    },
    partners: [
      { name: "Bali Construction Group" },
      { name: "Tropical Landscapes Studio" },
      { name: "Interior Atelier Bali" },
    ],
  },
  "sudirman-tower": {
    title: "Sudirman Tower",
    category: "Commercial",
    description: "Menjulang 40 lantai di pusat segitiga emas Jakarta, menara ini adalah pernyataan vertikal tentang arsitektur berkelanjutan. Fasad kaca berkinerja tinggi tidak hanya merespons iklim tropis — ia menangkap sinar matahari dan menyalurkan pencahayaan alami hingga ke inti bangunan. Sebagai gedung perkantoran pertama di Indonesia yang meraih sertifikasi LEED Platinum, Sudirman Tower mendefinisikan ulang standar arsitektur komersial di kawasan ini.",
    thumbnail: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" },
    images: [
      { src: "/images/portfolio/tower-01.jpg", alt: "Tower exterior" },
      { src: "/images/portfolio/tower-02.jpg", alt: "Lobby interior" },
      { src: "/images/portfolio/tower-03.jpg", alt: "Office floor" },
      { src: "/images/portfolio/tower-04.jpg", alt: "Rooftop garden" },
    ],
    location: "Jakarta, Indonesia",
    year: "2023",
    awards: ["Sertifikasi LEED Platinum — US Green Building Council 2023", "Penghargaan Arsitektur Komersial Terbaik, Indonesia Property Awards 2023", "Pencapaian Bangunan Hijau Teladan, Kementerian PUPR 2024"],
    stats: [
      { value: "40", label: "Lantai", suffix: "+" },
      { value: "50000", label: "Luas Lantai", suffix: " m²" },
      { value: "LEED", label: "Sertifikasi Platinum" },
      { value: "2023", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Kajian Kelayakan & Regulasi", description: "Menganalisis kondisi tapak, peraturan zonasi, dan permintaan pasar untuk menentukan massa bangunan dan distribusi program yang paling optimal di kawasan padat Jakarta." },
      { title: "Rekayasa Fasad", description: "Merancang sistem curtain wall berkinerja tinggi yang mengurangi perolehan panas matahari sekaligus memaksimalkan penetrasi cahaya alami ke seluruh lantai." },
      { title: "Sistem Berkelanjutan", description: "Mengintegrasikan panen air hujan, panel surya, dan sistem HVAC hemat energi yang menjadi tulang punggung pencapaian sertifikasi LEED Platinum." },
      { title: "Arsitektur Interior", description: "Menciptakan denah lantai fleksibel dengan material premium, elemen desain biofilik, dan teknologi bangunan pintar yang meningkatkan produktivitas penghuni." },
    ],
    testimonial: {
      name: "David Chen",
      role: "Pendiri",
      company: "Chen Properties",
      content: "Sudirman Tower bukan hanya gedung perkantoran — ia adalah protokol baru untuk arsitektur komersial di Jakarta. Penguasaan tim terhadap desain berkelanjutan telah mengubah visi kami menjadi landmark yang dikagumi penyewa dan investor.",
      rating: 5,
    },
    partners: [
      { name: "Arup Engineering" },
      { name: "Green Building Council Indonesia" },
      { name: "CSL Interior Solutions" },
    ],
  },
  "nusantara-resort": {
    title: "Nusantara Resort",
    category: "Hospitality",
    description: "Sebuah resor di pesisir Lombok yang merayakan ekologi pantai tanpa kompromi pada kemewahan. Seratus dua puluh vila tersebar di lahan seluas sepuluh hektar, masing-masing berorientasi pada poros angin laut dan dibingkai vegetasi pantai yang dipertahankan. Arsitektur tropis kontemporer — dengan atap-atap menjulang, material bambu struktural, dan kolam pribadi yang memantulkan langit Senaru — menciptakan pengalaman menginap yang intim namun tetap terhubung dengan alam.",
    thumbnail: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" },
    images: [
      { src: "/images/portfolio/resort-01.jpg", alt: "Resort aerial view" },
      { src: "/images/portfolio/resort-02.jpg", alt: "Beachfront villa" },
      { src: "/images/portfolio/resort-03.jpg", alt: "Spa facility" },
      { src: "/images/portfolio/resort-04.jpg", alt: "Restaurant terrace" },
    ],
    location: "Lombok, Indonesia",
    year: "2025",
    awards: ["Resor Desain Terbaik Asia Pasifik 2025 — Hospitality Design Awards", "Penghargaan Arsitektur Berkelanjutan — PATA 2025"],
    stats: [
      { value: "120", label: "Unit Vila" },
      { value: "10", label: "Luas Lahan", suffix: " hektar" },
      { value: "5", label: "Ruang Kuliner" },
      { value: "2025", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Penataan Master Plan", description: "Merancang tata letak resor yang mempertahankan vegetasi pantai eksisting sambil memaksimalkan panorama laut dari setiap vila — keseimbangan antara densitas dan privasi." },
      { title: "Prototipe Vila", description: "Menciptakan tiga tipologi vila — tepi pantai, taman, dan bukit — masing-masing dengan orientasi, bayangan, dan aliran udara yang dioptimalkan untuk pengalaman dalam-luar yang khas." },
      { title: "Desain Lanskap", description: "Mengintegrasikan spesies tropis asli, jalur batu alam, dan elemen air yang bergema dengan ekosistem pesisir — menciptakan lanskap yang terasa telah ada sejak lama." },
      { title: "Kurasi Interior", description: "Memilih furnitur buatan pengrajin lokal, tekstil tenun tangan, dan pencahayaan kustom yang menghadirkan keaslian tempat tanpa mengorbankan kemewahan kontemporer." },
    ],
    testimonial: {
      name: "Miyako Tanaka",
      role: "Direktur",
      company: "Luxury Retreats Asia",
      content: "Kolaborasi dengan tim ini adalah harmoni antara intuisi dan ketepatan. Mereka tidak hanya memahami visi kami — mereka mewujudkannya dalam bahasa arsitektur yang melampaui ekspektasi. Nusantara Resort kini menjadi ikon perhotelan Lombok yang diakui secara global.",
      rating: 5,
    },
    partners: [
      { name: "Lombok Landscape Architects" },
      { name: "Artisan Interiors" },
      { name: "Coastal Engineering Solutions" },
    ],
  },
  "green-valley": {
    title: "Green Valley Estate",
    category: "Master Planning",
    description: "Sebuah komunitas terencana seluas lima puluh hektar di ketinggian Bandung yang mendefinisikan ulang keseimbangan antara kepadatan dan kualitas hidup. Jaringan koridor hijau menghubungkan klaster residensial, pusat komersial, dan taman sentral dalam satu kesatuan urban yang koheren. Konsep transit-oriented development yang mengurangi ketergantungan pada kendaraan pribadi mengukuhkan Green Valley sebagai protokol baru perencanaan kota di Indonesia.",
    thumbnail: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" },
    images: [
      { src: "/images/portfolio/green-valley-01.jpg", alt: "Master plan overview" },
      { src: "/images/portfolio/green-valley-02.jpg", alt: "Residential cluster" },
      { src: "/images/portfolio/green-valley-03.jpg", alt: "Central park" },
      { src: "/images/portfolio/green-valley-04.jpg", alt: "Commercial center" },
    ],
    location: "Bandung, Indonesia",
    year: "2024",
    awards: ["Penghargaan Master Plan Terbaik — Indonesia Landscape Awards 2025", "Komunitas Berkelanjutan Teladan — Kementerian ATR/BPN 2024"],
    stats: [
      { value: "50", label: "Luas Kawasan", suffix: " hektar" },
      { value: "500", label: "Unit Hunian" },
      { value: "3", label: "Pusat Komersial" },
      { value: "2024", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Analisis Tapak", description: "Mengevaluasi topografi, pola aliran air, dan vegetasi eksisting untuk menciptakan pengembangan yang bekerja dengan alam — menjaga kontur alami sebagai kerangka desain." },
      { title: "Kerangka Komunitas", description: "Merancang hierarki ruang publik — dari taman sentral hingga taman lingkungan — yang mendorong interaksi sosial dan menciptakan rasa kepemilikan bersama di antara penghuni." },
      { title: "Perencanaan Infrastruktur", description: "Merencanakan jaringan jalan, utilitas, dan drainase dengan kapasitas ekspansi masa depan dan gangguan lingkungan yang minimal — infrastruktur yang tidak terlihat tetapi terasa." },
      { title: "Pedoman Berkelanjutan", description: "Menyusun pedoman desain untuk seluruh bangunan yang memastikan estetika kohesif, efisiensi energi, dan praktik konstruksi hijau yang terukur." },
    ],
    testimonial: {
      name: "Dr. Ratna Kusuma",
      role: "Prinsipal",
      company: "Bandung Urban Development",
      content: "Green Valley Estate adalah manifesto perencanaan kota berkelanjutan di Indonesia. Tim ini berhasil menyeimbangkan kepadatan dan kualitas hidup dalam satu kesatuan yang koheren — sebuah standar baru yang layak ditiru di seluruh Nusantara.",
      rating: 5,
    },
    partners: [
      { name: "Bandung Infrastructure Authority" },
      { name: "Green Urban Design Lab" },
      { name: "Sustainable Communities Institute" },
    ],
  },
  "the-sanctuary": {
    title: "The Sanctuary",
    category: "Residential",
    description: "Sebuah kediaman pribadi di Ubud yang dirancang sebagai retret dalam hutan tropis. Batas antara dalam dan luar sengaja dikaburkan — dinding kaca selebar ruang tamu menghilang ke dalam taman, sementara atap hijau dan dinding batu vulkanik menyamarkan massa bangunan di antara kanopi pepohonan. Rumah ini adalah studi tentang ketahanan — sebuah arsitektur yang hidup bersama waktu, bukan melawannya.",
    thumbnail: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" },
    images: [
      { src: "/images/portfolio/sanctuary-01.jpg", alt: "Main residence exterior" },
      { src: "/images/portfolio/sanctuary-02.jpg", alt: "Infinity pool overlooking valley" },
      { src: "/images/portfolio/sanctuary-03.jpg", alt: "Open-plan living area" },
      { src: "/images/portfolio/sanctuary-04.jpg", alt: "Master suite" },
    ],
    location: "Ubud, Indonesia",
    year: "2023",
    awards: ["Penghargaan Desain Residensial Terbaik — Indonesia Green Building Awards 2023", "Sertifikasi Greenship Platinum — GBC Indonesia 2023"],
    stats: [
      { value: "600", label: "Luas Bangunan", suffix: " m²" },
      { value: "3", label: "Kamar Tidur" },
      { value: "18", label: "Masa Konstruksi", suffix: " bulan" },
      { value: "2023", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Imersi Tapak", description: "Memahami mikroklimat hutan, koridor cahaya alami yang menembus kanopi, dan pola angin untuk menginformasikan setiap keputusan desain — dari orientasi bukaan hingga posisi ruang basah." },
      { title: "Desain Biofilik", description: "Mengembangkan konsep yang mengaburkan batas antara interior dan eksterior melalui dinding kaca lipat penuh, halaman terbuka, dan atap hijau yang menyatu dengan kanopi hutan." },
      { title: "Kurasi Material", description: "Menyaring kayu bersertifikasi berkelanjutan, batu lokal dari sungai sekitar, dan finishing alami yang akan menua dengan elegan — menciptakan patina seiring waktu." },
      { title: "Sistem Berkelanjutan", description: "Mengintegrasikan panen air hujan, energi surya, dan ventilasi silang alami untuk mencapai jejak karbon net-zero — bukti bahwa kemewahan dan keberlanjutan dapat berjalan beriringan." },
    ],
    testimonial: {
      name: "Alexandra Hartono",
      role: "Pemilik Kediaman",
      content: "Lebih dari sekadar rumah — The Sanctuary adalah ruang yang mengingatkan saya setiap hari tentang ketenangan yang mungkin dicapai ketika arsitektur benar-benar menghormati alam. Tim ini memahami bagaimana saya ingin hidup bahkan sebelum saya mampu mengatakannya.",
      rating: 5,
    },
    partners: [
      { name: "Ubud Green Builders" },
      { name: "Natural Stone Works" },
      { name: "Forest Light Landscapes" },
    ],
  },
  "marina-club": {
    title: "Marina Bay Club",
    category: "Hospitality",
    description: "Sebuah klub anggota eksklusif di distrik Marina Bay yang merayakan kemewahan melalui keheningan. Interior yang menahan diri — marmer Calacatta, kuningan poles tangan, dan panel kayu ceri — menciptakan atmosfer keanggotaan yang canggih. Dermaga pribadi dengan cakrawala Singapura menjadi latar pengalaman kuliner dan kebugaran yang dirancang untuk jiwa-jiwa diskriminatif.",
    thumbnail: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" },
    images: [
      { src: "/images/portfolio/marina-01.jpg", alt: "Club entrance" },
      { src: "/images/portfolio/marina-02.jpg", alt: "Main lounge" },
      { src: "/images/portfolio/marina-03.jpg", alt: "Rooftop pool" },
      { src: "/images/portfolio/marina-04.jpg", alt: "Dining room" },
    ],
    location: "Singapore",
    year: "2025",
    awards: ["Penghargaan Desain Hospitalitas Terbaik — Singapore Design Awards 2025", "Nominasi World Architecture Festival — Kategori Interior 2025"],
    stats: [
      { value: "5000", label: "Luas Interior", suffix: " m²" },
      { value: "6", label: "Ruang Kuliner" },
      { value: "300", label: "Kapasitas Anggota" },
      { value: "2025", label: "Tahun Rampung" },
    ],
    process: [
      { title: "Penyusunan Konsep", description: "Merumuskan konsep tepi air yang terinspirasi estetika klub kapal pesiar mewah — menyeimbangkan eksklusivitas dengan kehangatan melalui material, cahaya, dan proporsi ruang." },
      { title: "Arsitektur Interior", description: "Mengkurasi palet material — marmer Calacatta, kuningan permukaan sikat, kayu jati solid — yang mengalir koheren dari lobi utama hingga ruang makan privat dan lounge anggota." },
      { title: "Desain Fasad", description: "Menciptakan dinding tirai kaca dengan pencahayaan dinamis yang menghidupkan fasad tepi air di malam hari — mercusuar kontemporer di teluk." },
      { title: "Integrasi Kebugaran", description: "Merancang sayap spa dan kebugaran di sekitar halaman sentral yang dipenuhi cahaya alami, dengan fitur air dan taman tropis vertikal yang membingkai kolam infinity atap." },
    ],
    testimonial: {
      name: "Michael Tan",
      role: "Direktur Utama",
      company: "Marina Bay Hospitality",
      content: "Marina Bay Club telah mendefinisikan ulang makna klub anggota. Setiap detail — dari suhu kuningan di pegangan pintu hingga irama sirkulasi antarruang — adalah manifesto kualitas tanpa kompromi. Inilah standar baru untuk hospitalitas eksklusif di Asia.",
      rating: 5,
    },
    partners: [
      { name: "Singapore Design Consortium" },
      { name: "Waterfront Engineering Pte Ltd" },
      { name: "Luxury Fit-Out Solutions" },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return createMetadata({ title: "Project Not Found" });
  return createMetadata({ title: project.title, description: project.description });
}

const allProjects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Commercial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Planning", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapore", year: "2025" },
];

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return <CTADefault title="Proyek Tidak Ditemukan" description="Halaman yang Anda cari tidak tersedia." primaryCta={{ label: "Kembali ke Portofolio", href: "/portfolio" }} />;
  }

  const awards: AwardItem[] = (project.awards ?? []).map((a) => ({
    title: a,
    organization: "PT Karya Nusantara Realty",
    year: project.year,
    description: `Awarded for excellence in ${project.category.toLowerCase()} architecture.`,
  }));

  const projectItem: ProjectItem = {
    id: slug,
    title: project.title,
    category: project.category,
    description: project.description,
    thumbnail: project.thumbnail,
    images: project.images,
    location: project.location,
    year: project.year,
  };

  const remainingProjects = allProjects.filter((p) => p.href !== `/portfolio/${slug}`);

  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: `${project.title} — ${project.category} Architecture Case Study`,
        description: project.description,
        url: `/portfolio/${slug}`,
      })} id="webpage-schema" />
      <JsonLdScript data={createProjectSchema({
        name: project.title,
        description: project.description,
        image: project.thumbnail.src,
        category: project.category,
        location: project.location,
        year: project.year,
      })} id="project-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Portfolio", href: "/portfolio" },
        { name: project.title },
      ])} id="breadcrumb-schema" />
      {project.testimonial && (
        <JsonLdScript data={createReviewSchema({
          itemName: project.title,
          reviewBody: project.testimonial.content,
          authorName: project.testimonial.name,
          reviewRating: project.testimonial.rating ?? 5,
          datePublished: project.year,
          url: `/portfolio/${slug}`,
        })} id="review-schema" />
      )}
      <ProjectDetailHeader project={projectItem} />
      <div className="container-site py-6">
        <Breadcrumb
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
        />
      </div>
      <ProjectGallery title={project.title} images={project.images} />
      <div className="container-site py-8">
        <div className="rounded-lg border border-gold-500/10 bg-surface-secondary p-8 text-center">
          <p className="text-body-lg text-text-secondary mb-4">Tertarik dengan proyek serupa?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-body-sm font-medium text-white transition-all duration-300 hover:bg-gold-600"
          >
            Diskusikan Proyek Anda
          </a>
        </div>
      </div>
      <BeforeAfter
        title="Sebelum & Sesudah"
        description="Transformasi dari wujud konseptual menuju realitas terbangun yang utuh."
        project={projectItem}
      />
      <ProcessSteps
        title="Tahapan Penciptaan"
        description="Perjalanan desain — dari dialog pertama di tapak hingga sentuhan akhir yang sempurna."
        steps={project.process}
      />
      {project.testimonial && (
        <ClientReviews
          title="Perspektif Klien"
          description="Refleksi dari mereka yang mempercayakan visinya kepada kami."
          testimonials={[project.testimonial]}
          variant="grid"
        />
      )}
      {project.partners && (
        <PartnersShowcase
          title="Kolaborator"
          description="Rekan kerja yang turut mewujudkan karya ini."
          partners={project.partners}
          variant="simple"
        />
      )}
      <ProjectStatistics
        title="Data Proyek"
        description="Metrik kunci yang mendefinisikan skala dan kompleksitas karya ini."
        stats={project.stats}
      />
      <Awards title="Penghargaan & Pengakuan" awards={awards} />
      {remainingProjects.length > 0 && (
        <FeaturedProjects
          title="Proyek Terkait"
          description="Karya lain dari rangkaian portofolio kami yang mungkin menginspirasi."
          projects={remainingProjects.slice(0, 3)}
        />
      )}
      <CTADefault
        title="Terinspirasi oleh Karya Ini?"
        description="Izinkan kami menciptakan sesuatu yang setara untuk ruang Anda. Bagikan visi Anda dan mari kita wujudkan bersama."
        primaryCta={{ label: "Diskusikan Proyek Anda", href: "/contact" }}
      />
    </>
  );
}
