import { Breadcrumb } from "@/components";
import { BlogPosts, BlogCategories, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { BlogPost } from "@/sections";

export const metadata = createMetadata({
  title: "Jurnal — Wawasan Arsitektur & Desain",
  description: "Artikel dan perspektif tentang arsitektur premium, desain interior, material, tren properti, dan lingkungan binaan dari studio Karya Nusantara Realty.",
});

const featuredPosts: BlogPost[] = [
  { title: "Masa Depan Kemewahan Berkelanjutan", excerpt: "Bagaimana studio kami mendefinisikan ulang kemewahan melalui prinsip desain berkelanjutan dan kurasi material yang cermat.", image: { src: "/images/blog/sustainable-luxury.jpg", alt: "Interior mewah dengan material ramah lingkungan" }, date: "2025-06-15", author: "Ardi Wicaksono", category: "Keberlanjutan", href: "/blog/future-of-sustainable-luxury" },
  { title: "Mendesain untuk Iklim Tropis", excerpt: "Prinsip-prinsip untuk menciptakan hunian yang nyaman, teduh, dan indah dalam konteks iklim tropis Nusantara.", image: { src: "/images/blog/tropical-living.jpg", alt: "Hunian tropis kontemporer" }, date: "2025-05-28", author: "Sari Dewi", category: "Desain", href: "/blog/designing-for-tropical-living" },
  { title: "Biofilia di Tengah Kota", excerpt: "Menghadirkan elemen alam ke dalam lingkungan urban melalui pendekatan arsitektur biofilik yang autentik.", image: { src: "/images/blog/biophilic.jpg", alt: "Ruang hijau dalam arsitektur urban" }, date: "2025-05-10", author: "Rina Wijaya", category: "Tren Desain", href: "/blog/biophilic-design-urban-spaces" },
];

const latestPosts: BlogPost[] = [
  { title: "Panduan IMB untuk Hunian dan Komersial", excerpt: "Navigasi proses perizinan bangunan di Indonesia — dari dokumen hingga persetujuan.", image: { src: "/images/blog/permits.jpg", alt: "Dokumen perizinan arsitektur" }, date: "2025-04-20", author: "Budi Santoso", category: "Panduan", href: "/blog/navigating-building-permits" },
  { title: "Batu Alam Nusantara: Warisan dalam Arsitektur Modern", excerpt: "Menjelajahi kekayaan batu alam Indonesia dan aplikasinya dalam ekspresi arsitektur kontemporer.", image: { src: "/images/blog/local-stone.jpg", alt: "Tekstur batu alam pada fasad" }, date: "2025-04-05", author: "Maya Putri", category: "Material", href: "/blog/material-spotlight-local-stone" },
  { title: "Pencahayaan sebagai Bahasa Arsitektur", excerpt: "Bagaimana desain pencahayaan yang matang mampu mentransformasi ruang dan mempertegas bentuk.", image: { src: "/images/blog/lighting.jpg", alt: "Permainan cahaya dalam ruang arsitektural" }, date: "2025-03-18", author: "Dimas Prayogo", category: "Desain", href: "/blog/art-of-architectural-lighting" },
  { title: "Merawat Warisan Lewat Bahasa Modern", excerpt: "Mengintegrasikan keahlian tradisional Indonesia ke dalam narasi arsitektur kontemporer.", image: { src: "/images/blog/heritage.jpg", alt: "Arsitektur yang memadukan tradisi dan modernitas" }, date: "2025-03-01", author: "Ardi Wicaksono", category: "Budaya", href: "/blog/preserving-heritage-modern-design" },
  { title: "Rumah Pintar di Hunian Premium", excerpt: "Perkembangan terkini dalam otomatisasi hunian dan perannya dalam definisi kemewahan modern.", image: { src: "/images/blog/smart-home.jpg", alt: "Teknologi rumah pintar terintegrasi" }, date: "2025-02-14", author: "Alex Hartono", category: "Teknologi", href: "/blog/smart-home-luxury-properties" },
  { title: "Palet Warna Arsitektur 2025", excerpt: "Menyimak tren warna yang membentuk wajah arsitektur kontemporer tahun ini.", image: { src: "/images/blog/color-trends.jpg", alt: "Eksplorasi warna dalam desain arsitektur" }, date: "2025-01-30", author: "Lisa Tanudjaja", category: "Tren Desain", href: "/blog/color-trends-2025" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Blog" },
      ])} id="breadcrumb-schema" />
      <JsonLdScript data={createWebPageSchema({
        name: "Jurnal — Wawasan Arsitektur & Desain",
        description: "Artikel dan perspektif tentang arsitektur premium, desain interior, material, dan tren properti dari studio Karya Nusantara Realty.",
        url: "/blog",
      })} id="webpage-schema" />
      <section className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <Breadcrumb items={[{ label: "Blog" }]} />
        </div>
      </section>
      <BlogPosts
        title="Esai Pilihan"
        description="Kurasi perspektif dari studio kami tentang arsitektur, desain, dan lingkungan binaan."
        posts={featuredPosts}
        variant="featured"
      />
      <BlogPosts
        title="Tulisan Terbaru"
        description="Pemikiran dan wawasan terkini dari studio Karya Nusantara."
        posts={latestPosts}
        variant="latest"
        columns={3}
      />
      <NewsletterCTA
        title="Ikuti Perjalanan Kami"
        description="Berlangganan untuk menerima artikel terbaru, pembaruan proyek, dan perspektif desain eksklusif."
      />
      <CTADefault
        title="Inspirasi Tak Lagi Cukup — Wujudkan."
        description="Studio kami siap menerjemahkan visi Anda menjadi mahakarya arsitektur. Mari berbincang."
        primaryCta={{ label: "Mulai Perjalanan Desain Anda", href: "/contact" }}
      />
    </>
  );
}