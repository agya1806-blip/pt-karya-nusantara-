import { BlogPosts, BlogCategories, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { BlogPost } from "@/sections";

export const metadata = createMetadata({
  title: "Blog",
  description: "Perspektif tentang arsitektur, desain, dan lingkungan binaan dari tim PT Karya Nusantara Realty.",
});

const featuredPosts: BlogPost[] = [
  { title: "Masa Depan Arsitektur Mewah Berkelanjutan", excerpt: "Bagaimana kami mendefinisikan ulang kemewahan melalui prinsip desain berkelanjutan dan material yang dipilih dengan cermat.", image: { src: "/images/blog/sustainable-luxury.jpg", alt: "Arsitektur mewah berkelanjutan" }, date: "2025-06-15", author: "Ardi Wicaksono", category: "Keberlanjutan", href: "/blog/future-of-sustainable-luxury" },
  { title: "Mendesain untuk Hunian Tropis", excerpt: "Prinsip untuk menciptakan rumah yang nyaman dan indah di iklim tropis Indonesia.", image: { src: "/images/blog/tropical-living.jpg", alt: "Desain hunian tropis" }, date: "2025-05-28", author: "Sari Dewi", category: "Desain", href: "/blog/designing-for-tropical-living" },
  { title: "Desain Biofilik di Ruang Urban", excerpt: "Menghadirkan alam ke dalam kota melalui integrasi elemen alami dalam arsitektur.", image: { src: "/images/blog/biophilic.jpg", alt: "Desain biofilik" }, date: "2025-05-10", author: "Rina Wijaya", category: "Tren Desain", href: "/blog/biophilic-design-urban-spaces" },
];

const latestPosts: BlogPost[] = [
  { title: "Navigasi Izin Bangunan di Indonesia", excerpt: "Panduan proses perizinan untuk proyek residensial dan komersial di Indonesia.", image: { src: "/images/blog/permits.jpg", alt: "Izin bangunan" }, date: "2025-04-20", author: "Budi Santoso", category: "Panduan", href: "/blog/navigating-building-permits" },
  { title: "Sorotan Material: Batu Alam Lokal", excerpt: "Menjelajahi warisan batu alam Indonesia dan aplikasi arsitektur kontemporernya.", image: { src: "/images/blog/local-stone.jpg", alt: "Arsitektur batu alam" }, date: "2025-04-05", author: "Maya Putri", category: "Material", href: "/blog/material-spotlight-local-stone" },
  { title: "Seni Pencahayaan Arsitektural", excerpt: "Bagaimana desain pencahayaan yang baik mengubah ruang dan meningkatkan bentuk arsitektur.", image: { src: "/images/blog/lighting.jpg", alt: "Pencahayaan arsitektural" }, date: "2025-03-18", author: "Dimas Prayogo", category: "Desain", href: "/blog/art-of-architectural-lighting" },
  { title: "Melestarikan Warisan Melalui Desain Modern", excerpt: "Mengintegrasikan kerajinan tradisional Indonesia ke dalam ekspresi arsitektur kontemporer.", image: { src: "/images/blog/heritage.jpg", alt: "Arsitektur warisan" }, date: "2025-03-01", author: "Ardi Wicaksono", category: "Budaya", href: "/blog/preserving-heritage-modern-design" },
  { title: "Integrasi Rumah Pintar di Properti Mewah", excerpt: "Perkembangan terbaru dalam otomatisasi rumah dan perannya dalam pengalaman hunian mewah kontemporer.", image: { src: "/images/blog/smart-home.jpg", alt: "Teknologi rumah pintar" }, date: "2025-02-14", author: "Alex Hartono", category: "Teknologi", href: "/blog/smart-home-luxury-properties" },
  { title: "Tren Warna dalam Arsitektur 2025", excerpt: "Melihat palet warna yang muncul yang membentuk desain arsitektur tahun ini.", image: { src: "/images/blog/color-trends.jpg", alt: "Tren warna arsitektur" }, date: "2025-01-30", author: "Lisa Tanudjaja", category: "Tren Desain", href: "/blog/color-trends-2025" },
];

export default function BlogPage() {
  return (
    <>
      <BlogPosts
        title="Artikel Pilihan"
        description="Perspektif terkurasi dari tim kami tentang arsitektur, desain, dan lingkungan binaan."
        posts={featuredPosts}
        variant="featured"
      />
      <BlogPosts
        title="Artikel Terbaru"
        description="Pemikiran dan wawasan terbaru dari studio kami."
        posts={latestPosts}
        variant="latest"
        columns={3}
      />
      <NewsletterCTA
        title="Tetap Terinformasi"
        description="Berlangganan untuk menerima artikel terbaru, pembaruan proyek, dan perspektif desain."
      />
      <CTADefault
        title="Ubah Inspirasi Menjadi Kenyataan"
        description="Tim kami siap mewujudkan visi arsitektur Anda. Mari mulai percakapan."
        primaryCta={{ label: "Mulai Proyek Anda", href: "/contact" }}
      />
    </>
  );
}