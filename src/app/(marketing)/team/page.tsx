import { AnimatedSection } from "@/components/animation";
import { TeamGrid } from "@/sections";
import { createMetadata } from "@/seo";
import type { TeamMember } from "@/sections";

export const metadata = createMetadata({
  title: "Tim Kami",
  description: "Kenali para arsitek visioner, desainer, dan ahli di balik proyek-proyek pemenang penghargaan PT Karya Nusantara Realty.",
});

const allMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Lebih dari 25 tahun pengalaman dalam arsitektur mewah di seluruh Asia Tenggara." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Desainer pemenang penghargaan yang mengkhususkan diri pada proyek residensial dan hospitality mewah." },
  { name: "Budi Santoso", role: "Mitra Pengelola", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Mengawasi operasional firma, hubungan klien, dan inisiatif pertumbuhan strategis." },
  { name: "Rina Wijaya", role: "Direktur Kreatif", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Memimpin visi kreatif di seluruh proyek, memastikan keunggulan dan inovasi desain." },
  { name: "Dimas Prayogo", role: "Arsitek Senior", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Mengkhususkan diri pada pengembangan residensial dan mixed-use." },
  { name: "Maya Putri", role: "Arsitek Senior", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Ahli dalam desain berkelanjutan dan sertifikasi bangunan hijau." },
  { name: "Alex Hartono", role: "Arsitek Proyek", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Berfokus pada proyek hospitality dan komersial." },
  { name: "Dewi Lestari", role: "Arsitek Proyek", image: { src: "/images/team/dewi.jpg", alt: "Dewi Lestari" }, bio: "Bergairah tentang desain residensial dan arsitektur interior." },
  { name: "Rizky Hidayat", role: "Arsitek Muda", image: { src: "/images/team/rizky.jpg", alt: "Rizky Hidayat" }, bio: "Talenta muda dengan keahlian dalam visualisasi 3D dan BIM." },
  { name: "Nadia Kusuma", role: "Arsitek Muda", image: { src: "/images/team/nadia.jpg", alt: "Nadia Kusuma" }, bio: "Mengkhususkan diri pada master plan dan desain urban." },
  { name: "Dr. Hendra Gunawan", role: "Insinyur Struktur", image: { src: "/images/team/hendra.jpg", alt: "Dr. Hendra Gunawan" }, bio: "PhD di bidang Teknik Struktur, pengalaman 20+ tahun." },
  { name: "Lisa Tanudjaja", role: "Desainer Interior", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Desainer interior pemenang penghargaan dengan passion untuk ruang mewah." },
  { name: "Fajar Prasetyo", role: "Arsitek Lansekap", image: { src: "/images/team/fajar.jpg", alt: "Fajar Prasetyo" }, bio: "Menciptakan lingkungan luar ruangan yang harmonis yang melengkapi desain arsitektur." },
  { name: "Dr. Ani Rahmawati", role: "Konsultan Keberlanjutan", image: { src: "/images/team/ani.jpg", alt: "Dr. Ani Rahmawati" }, bio: "Memimpin inisiatif arsitektur hijau dan strategi net-zero kami." },
];

export default function TeamPage() {
  return (
    <>
      <AnimatedSection>
        <TeamGrid
          title="Tim Kami"
          description="Kenali para arsitek visioner, desainer, dan ahli di balik proyek-proyek pemenang penghargaan PT Karya Nusantara Realty."
          members={allMembers}
          columns={4}
        />
      </AnimatedSection>
    </>
  );
}