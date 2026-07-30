import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Karya Nusantara Realty menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24">
      <div className="container-site max-w-4xl">
        <h1 className="text-display font-light tracking-tight text-text-primary mb-8">Kebijakan Privasi</h1>
        <div className="space-y-6 text-body text-text-secondary leading-relaxed [&_h2]:text-display-sm [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>Terakhir diperbarui: 1 Januari 2025</p>

          <h2>1. Pendahuluan</h2>
          <p>PT Karya Nusantara Realty ("kami," "milik kami," atau "kita") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda ketika Anda mengunjungi situs web atau menggunakan layanan kami.</p>

          <h2>2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela ketika Anda:</p>
          <ul>
            <li>Mengisi formulir kontak</li>
            <li>Berlangganan buletin kami</li>
            <li>Mengirimkan pertanyaan proyek</li>
            <li>Melamar posisi pekerjaan</li>
            <li>Berkomunikasi dengan kami melalui surel atau telepon</li>
          </ul>

          <h2>3. Cara Kami Menggunakan Informasi Anda</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
          <ul>
            <li>Menanggapi pertanyaan Anda dan menyediakan layanan arsitektur</li>
            <li>Mengirimkan komunikasi pemasaran (dengan persetujuan Anda)</li>
            <li>Memproses lamaran pekerjaan</li>
            <li>Meningkatkan kualitas situs web dan layanan kami</li>
            <li>Memenuhi kewajiban hukum yang berlaku</li>
          </ul>

          <h2>4. Perlindungan Data</h2>
          <p>Kami menerapkan langkah-langkah teknis dan organisasional yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau pemusnahan.</p>

          <h2>5. Hak Anda</h2>
          <p>Anda berhak untuk:</p>
          <ul>
            <li>Mengakses data pribadi Anda</li>
            <li>Memperbaiki data yang tidak akurat</li>
            <li>Menghapus data Anda</li>
            <li>Menolak pemrosesan data Anda</li>
            <li>Portabilitas data</li>
          </ul>

          <h2>6. Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:</p>
          <p>
            Surel: karyanusantararealty@gmail.com<br />
            Telepon: +62 813 6054 6845<br />
            Alamat: Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188
          </p>
        </div>
      </div>
    </section>
  );
}
