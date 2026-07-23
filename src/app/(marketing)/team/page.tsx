import { TeamGrid } from "@/sections";
import { createMetadata } from "@/seo";
import type { TeamMember } from "@/sections";

export const metadata = createMetadata({
  title: "Our Team",
  description: "Meet the visionary architects, designers, and experts behind PT Karya Nusantara Realty's award-winning projects.",
});

const allMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Founder & Principal Architect", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "25+ years of experience in luxury architecture across Southeast Asia." },
  { name: "Sari Dewi", role: "Co-Founder & Design Director", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Award-winning designer specializing in luxury residential and hospitality projects." },
  { name: "Budi Santoso", role: "Managing Partner", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Oversees firm operations, client relationships, and strategic growth initiatives." },
  { name: "Rina Wijaya", role: "Creative Director", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Leads the creative vision across all projects, ensuring design excellence and innovation." },
  { name: "Dimas Prayogo", role: "Senior Architect", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Specializes in residential and mixed-use developments." },
  { name: "Maya Putri", role: "Senior Architect", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Expert in sustainable design and green building certification." },
  { name: "Alex Hartono", role: "Project Architect", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Focuses on hospitality and commercial projects." },
  { name: "Dewi Lestari", role: "Project Architect", image: { src: "/images/team/dewi.jpg", alt: "Dewi Lestari" }, bio: "Passionate about residential design and interior architecture." },
  { name: "Rizky Hidayat", role: "Junior Architect", image: { src: "/images/team/rizky.jpg", alt: "Rizky Hidayat" }, bio: "Rising talent with expertise in 3D visualization and BIM." },
  { name: "Nadia Kusuma", role: "Junior Architect", image: { src: "/images/team/nadia.jpg", alt: "Nadia Kusuma" }, bio: "Specializes in master planning and urban design." },
  { name: "Dr. Hendra Gunawan", role: "Structural Engineer", image: { src: "/images/team/hendra.jpg", alt: "Dr. Hendra Gunawan" }, bio: "PhD in Structural Engineering, 20+ years of experience." },
  { name: "Lisa Tanudjaja", role: "Interior Designer", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Award-winning interior designer with a passion for luxury spaces." },
  { name: "Fajar Prasetyo", role: "Landscape Architect", image: { src: "/images/team/fajar.jpg", alt: "Fajar Prasetyo" }, bio: "Creates harmonious outdoor environments that complement architectural designs." },
  { name: "Dr. Ani Rahmawati", role: "Sustainability Consultant", image: { src: "/images/team/ani.jpg", alt: "Dr. Ani Rahmawati" }, bio: "Leads our green architecture initiatives and net-zero strategy." },
];

export default function TeamPage() {
  return (
    <>
      <TeamGrid
        title="Our Team"
        description="Meet the visionary architects, designers, and experts behind PT Karya Nusantara Realty's award-winning projects."
        members={allMembers}
        columns={4}
      />
    </>
  );
}
