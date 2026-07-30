import { Breadcrumb } from "@/components";
import { AnimatedSection } from "@/components/animation";
import { CompanyOverview, VisionMission, Timeline, FounderStory, Values, Awards, StatisticsShowcase, TeamGrid, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { TimelineEvent, TeamMember, AwardItem, StatItem, ValueItem } from "@/sections";
import { Award, Leaf, HandshakeIcon, Palette, Shield, BadgeCheck, HeartHandshake, Lightbulb } from "lucide-react";

export const metadata = createMetadata({
  title: "Tentang Kami",
  description: "Di balik setiap karya agung tersimpan narasi tentang cahaya, tanah, dan jipta yang melampaui zaman — inilah kisah PT Karya Nusantara Realty.",
});

const stats: StatItem[] = [
  { value: "200", label: "Karya yang Terwujud", suffix: "+" },
  { value: "50", label: "Apresiasi Internasional", suffix: "+" },
  { value: "15", label: "Musim Berkreasi" },
  { value: "8", label: "Negeri Terjamah" },
];

const timelineEvents: TimelineEvent[] = [
  { year: "2010", title: "Benih Pertama", description: "Di tengah sunyi Banda Aceh, secercah keyakinan tumbuh: bahwa Indonesia pantas memiliki arsitektur yang berbicara dalam bahasa keabadian. Maka berdirilah Karya Nusantara Realty." },
  { year: "2013", title: "Lintas Batas Perdana", description: "Sebuah vila di Singapura menjadi jembatan pertama kami menuju panggung dunia. Di sanalah kami belajar bahwa bahasa arsitektur tak mengenal batas teritori." },
  { year: "2016", title: "Rumah Baru", description: "Studio kami membentang, menampung jiwa-jiwa kreatif dari beragam disiplin. Dinding yang lebih luas melahirkan gagasan yang lebih berani." },
  { year: "2019", title: "Musim Panen", description: "Penghargaan demi penghargaan menghampiri — bukan sebagai tujuan, melainkan cermin dari ketekunan yang selama ini kami rawat dalam diam." },
  { year: "2022", title: "Cakrawala Baru", description: "Media desain internasional menobatkan kami di antara yang terbaik di Asia Tenggara. Sebuah pengingat bahwa batas hanyalah ilusi bagi mereka yang terus melangkah." },
  { year: "2025", title: "Janji pada Masa Depan", description: "Divisi keberlanjutan lahir sebagai wujud komitmen kami pada bumi — sebuah sumpah untuk terus mendesain dengan nurani, bukan sekadar estetika." },
];

const founders: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Perjalanan dua dekade merajut ruang dan makna di Indonesia dan Asia Tenggara — seorang arsitek yang percaya bahwa setiap garis memiliki cerita, dan setiap ruang layak dihidupi." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Ia menenun warisan nusantara ke dalam kanvas arsitektur modern — merayakan kerajinan lokal dalam bahasa kontemporer yang universal, tanpa kehilangan jiwa." },
];

const teamMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Pendiri & Arsitek Utama", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Akal budi di balik visi studio — dua dekade merajut keindahan dan makna dalam setiap proyek yang dipercayakan." },
  { name: "Sari Dewi", role: "Rekan Pendiri & Direktur Desain", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Ia menenun tradisi ke dalam kanvas kontemporer — seorang desainer yang jiwanya berpijak pada warisan nusantara." },
  { name: "Budi Santoso", role: "Mitra Pengelola", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Penjaga arah dan arsitek strategi — memastikan setiap langkah firma berpijak pada keberlanjutan dan kepercayaan." },
  { name: "Rina Wijaya", role: "Direktur Kreatif", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Ia menjaga agar setiap goresan desain tetap setia pada visi awal — merawat koherensi dalam setiap lapisan gagasan." },
  { name: "Dimas Prayogo", role: "Arsitek Senior", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Mengawal proyek residensial dan mixed-use dari bisikan pertama hingga wujud akhir — dengan ketekunan yang tak kenal lelah." },
  { name: "Maya Putri", role: "Arsitek Senior", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Pelopor desain ramah bumi yang meyakini bahwa keindahan sejati lahir dari harmoni antara bangunan dan alam." },
  { name: "Alex Hartono", role: "Arsitek Proyek", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Menciptakan pengalaman yang tak terlupakan melalui arsitektur — karena sebuah ruang bukan hanya dilihat, melainkan dihayati." },
  { name: "Lisa Tanudjaja", role: "Desainer Interior", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Ruang adalah kanvas, dan ia melukis dengan bahan, cahaya, serta keheningan — menciptakan interior yang bernyanyi dalam bisik." },
];

const trustReasons: ValueItem[] = [
  { title: "Ketepatan Waktu & Anggaran", description: "Kami menghormati kepercayaan yang diberikan dengan transparansi penuh — setiap proyek selesai sesuai komitmen, tanpa biaya tersembunyi atau tenggat yang terlewat.", icon: <Shield size={18} /> },
  { title: "Kualitas Tanpa Kompromi", description: "Dari konsep hingga serah terima, setiap detail melalui kurasi ketat oleh tim arsitek senior yang mengawal langsung di lapangan.", icon: <BadgeCheck size={18} /> },
  { title: "Pendekatan Personal", description: "Anda bukan sekadar klien — Anda adalah mitra. Setiap keputusan lahir dari dialog, bukan dikte. Visi Anda adalah cetak biru kami.", icon: <HeartHandshake size={18} /> },
  { title: "Inovasi Berkelanjutan", description: "Kami terus memperbarui wawasan terhadap material, teknologi, dan tren global — tanpa pernah kehilangan akar pada kearifan lokal.", icon: <Lightbulb size={18} /> },
];

const awards: AwardItem[] = [
  { title: "Mahakarya Residensial Terbaik", year: "2023", description: "Asia Pacific Architecture Awards", organization: "APA" },
  { title: "Keunggulan Desain Hijau", year: "2024", description: "International Sustainable Design Awards", organization: "ISDA" },
  { title: "Rumah Kreatif Terbaik Tahun Ini", year: "2025", description: "Indonesia Architecture Excellence Awards", organization: "IAI" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Tentang PT Karya Nusantara Realty",
        description: "Praktik arsitektur yang lahir dari keyakinan bahwa Indonesia pantas memiliki keindahan yang abadi. Lebih dari 200 karya sejak 2010.",
        url: "/about",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Tentang" },
      ])} id="breadcrumb-schema" />
      <div className="container-site pt-28 pb-4">
        <Breadcrumb
          items={[
            { label: "Tentang" },
          ]}
        />
      </div>
      <AnimatedSection>
        <CompanyOverview
          title="Tentang PT Karya Nusantara Realty"
          description={[
            "Kami adalah ruang di mana arsitektur bertemu dengan jiwa. Berpijak di Aceh sejak 2010, kami telah dipercaya mewujudkan lebih dari dua ratus karya — dari hunian pribadi hingga master plan — masing-masing lahir dari dialog yang intim antara tanah, cahaya, dan manusia. Setiap garis yang kami gores adalah doa; setiap ruang yang kami lahirkan adalah janji pada keindahan yang abadi.",
          ]}
          image={{ src: "/images/about/overview.jpg", alt: "Studio PT Karya Nusantara Realty" }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StatisticsShowcase
          title="Dalam Bilangan"
          description="Setiap angka adalah jejak kepercayaan yang pernah dititipkan — dan telah kami jaga dengan sepenuh jiwa."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <VisionMission
          title="Visi & Misi Kami"
          vision={{ title: "Visi", description: "Menjadi ruang lahirnya arsitektur Nusantara yang diakui dunia — sebuah studio di mana ketelitian desain, kepekaan budaya, dan cinta pada bumi bersenyawa dalam harmoni." }}
          mission={{ title: "Misi", description: "Menciptakan lingkungan yang mengangkat hakikat manusia — ruang yang bukan hanya indah dipandang, tetapi juga menggetarkan jiwa, meladeni fungsi, dan setia pada waktu." }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <Values
          title="Nilai-Nilai Kami"
          values={[
            { title: "Cinta pada Detail", description: "Kami tidak mengenal kompromi pada keahlian, proporsi, dan nurani dalam setiap sentimeter karya — karena keindahan sejati bersemayam pada detail.", icon: <Award size={18} /> },
            { title: "Hidup Sejajar Alam", description: "Kami menitipkan jejak yang ringan di bumi — memilih material dengan kesadaran, mendesain untuk daur hidup panjang, bukan untuk musim yang fana.", icon: <Leaf size={18} /> },
            { title: "Kemitraan yang Tulus", description: "Hubungan sejati lahir dari menyimak dengan hati dan memberi dengan ketepatan — setiap proyek adalah perjalanan bersama yang kami tempuh dengan rasa hormat.", icon: <HandshakeIcon size={18} /> },
            { title: "Menghidupkan Warisan", description: "Kami bersimpuh pada kearifan leluhur — merayakan kerajinan tangan Indonesia dan kebijaksanaan arsitektur vernakular sebagai fondasi karya masa kini.", icon: <Palette size={18} /> },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <FounderStory founders={founders} />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Timeline title="Perjalanan Kami" events={timelineEvents} />
      </AnimatedSection>
      <AnimatedSection delay={0.55}>
        <Values
          label="Mengapa Memilih Kami"
          title="Alasan Klien Mempercayai Kami"
          description="Keempat pilar ini menjadi fondasi hubungan jangka panjang dengan setiap klien."
          values={trustReasons}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <TeamGrid
          title="Sang Perajin"
          description="Jiwa-jiwa di balik tiap karya — arsitek, desainer, dan pemimpi yang dipersatukan oleh hasrat yang sama: menciptakan keindahan yang berarti."
          members={teamMembers}
          columns={4}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.7}>
        <Awards title="Penghargaan & Pengakuan" awards={awards} />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <CTADefault
          title="Mulai Perjalanan Anda"
          description="Bagikan impian Anda pada kami. Setiap mahakarya berawal dari sebuah percakapan — dan kami siap mendengarkan."
          primaryCta={{ label: "Mulai Konsultasi", href: "/contact" }}
          secondaryCta={{ label: "Jelajahi Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}
