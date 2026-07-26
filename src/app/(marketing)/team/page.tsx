import { AnimatedSection } from "@/components/animation";
import { TeamGrid } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { TeamMember } from "@/sections";

export const metadata = createMetadata({
  title: "Tim — Arsitek & Visioner",
  description: "Kenali para arsitek visioner, desainer interior, dan ahli teknik di balik mahakarya Karya Nusantara Realty.",
});

const allMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Lebih dari 25 tahun menorehkan jejak dalam arsitektur premium di Asia Tenggara. Visioner di balik setiap mahakarya studio." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Desainer pemenang penghargaan yang menghadirkan kepekaan estetika tinggi pada setiap proyek residensial dan hospitality." },
  { name: "Budi Santoso", role: "Mitra Pengelola", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Mengemudikan operasional studio, hubungan klien, dan arah pertumbuhan strategis dengan integritas." },
  { name: "Rina Wijaya", role: "Direktur Kreatif", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Memimpin visi kreatif lintas proyek, memastikan setiap desain mencapai puncak keunggulan dan inovasi." },
  { name: "Dimas Prayogo", role: "Arsitek Senior", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Keahlian dalam pengembangan residensial dan mixed-use dengan pendekatan kontekstual yang mendalam." },
  { name: "Maya Putri", role: "Arsitek Senior", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Pakar desain berkelanjutan dan sertifikasi bangunan hijau yang mengintegrasikan ekologi ke dalam estetika." },
  { name: "Alex Hartono", role: "Arsitek Proyek", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Fokus pada proyek hospitality dan komersial dengan ketelitian yang tak kenal kompromi." },
  { name: "Dewi Lestari", role: "Arsitek Proyek", image: { src: "/images/team/dewi.jpg", alt: "Dewi Lestari" }, bio: "Bergairah pada desain residensial dan arsitektur interior yang menghangatkan jiwa." },
  { name: "Rizky Hidayat", role: "Arsitek Muda", image: { src: "/images/team/rizky.jpg", alt: "Rizky Hidayat" }, bio: "Talenta muda dengan penguasaan visualisasi 3D dan BIM yang melampaui usianya." },
  { name: "Nadia Kusuma", role: "Arsitek Muda", image: { src: "/images/team/nadia.jpg", alt: "Nadia Kusuma" }, bio: "Keahlian dalam master plan dan desain urban yang memandang kota sebagai kanvas." },
  { name: "Dr. Hendra Gunawan", role: "Insinyur Struktur", image: { src: "/images/team/hendra.jpg", alt: "Dr. Hendra Gunawan" }, bio: "PhD Teknik Struktur, 20+ tahun pengalaman — memastikan setiap karya berdiri kokoh dan abadi." },
  { name: "Lisa Tanudjaja", role: "Desainer Interior", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Desainer interior pemenang penghargaan yang merayakan kemewahan melalui detail tak terduga." },
  { name: "Fajar Prasetyo", role: "Arsitek Lansekap", image: { src: "/images/team/fajar.jpg", alt: "Fajar Prasetyo" }, bio: "Menciptakan harmoni antara ruang luar dan arsitektur — alam sebagai mitra desain." },
  { name: "Dr. Ani Rahmawati", role: "Konsultan Keberlanjutan", image: { src: "/images/team/ani.jpg", alt: "Dr. Ani Rahmawati" }, bio: "Memimpin inisiatif arsitektur hijau dan strategi net-zero yang menjadi standar baru studio." },
];

export default function TeamPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Tim — Arsitek & Visioner Karya Nusantara Realty",
        description: "Tim profesional arsitektur, desain interior, dan teknik yang dipimpin Ardi Wicaksono dan Sari Dewi — lebih dari 200 proyek prestisius.",
        url: "/team",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Tim" },
      ])} id="breadcrumb-schema" />
      <AnimatedSection>
        <TeamGrid
          title="Insan Studio"
          description="Kenali para arsitek visioner, desainer, dan ahli di balik mahakarya Karya Nusantara Realty."
          members={allMembers}
          columns={4}
        />
      </AnimatedSection>
    </>
  );
}