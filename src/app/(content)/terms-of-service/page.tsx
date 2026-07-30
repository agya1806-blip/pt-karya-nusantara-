import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Ketentuan Layanan",
  description: "Syarat dan ketentuan penggunaan situs web dan layanan Karya Nusantara Realty.",
});

export default function TermsOfServicePage() {
  return (
    <section className="py-24">
      <div className="container-site max-w-4xl">
        <h1 className="text-display font-light tracking-tight text-text-primary mb-8">Ketentuan Layanan</h1>
        <div className="space-y-6 text-body text-text-secondary leading-relaxed [&_h2]:text-display-sm [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>Terakhir diperbarui: 1 Januari 2025</p>

          <h2>1. Penerimaan Ketentuan</h2>
          <p>Dengan mengakses atau menggunakan situs web dan layanan Karya Nusantara Realty, Anda menyetujui untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan situs web atau layanan kami.</p>

          <h2>2. Layanan</h2>
          <p>Karya Nusantara Realty menyediakan layanan desain arsitektur dan konsultasi. Seluruh layanan tunduk pada perjanjian terpisah yang akan menguraikan lingkup, jadwal, dan biaya spesifik untuk proyek Anda.</p>

          <h2>3. Kekayaan Intelektual</h2>
          <p>Seluruh konten di situs web ini, termasuk desain, gambar, teks, foto, dan logo, adalah milik Karya Nusantara Realty dan dilindungi oleh undang-undang kekayaan intelektual yang berlaku. Anda tidak diperkenankan mereproduksi, mendistribusikan, atau membuat karya turunan tanpa izin tertulis sebelumnya.</p>

          <h2>4. Penggunaan Situs Web</h2>
          <p>Anda setuju untuk menggunakan situs web kami hanya untuk tujuan yang sah. Anda dilarang:</p>
          <ul>
            <li>Menggunakan situs web dengan cara yang melanggar hukum yang berlaku</li>
            <li>Mencoba mendapatkan akses tidak sah ke sistem kami</li>
            <li>Mengganggu fungsi situs web yang semestinya</li>
            <li>Mengunggah kode atau konten berbahaya</li>
          </ul>

          <h2>5. Batasan Tanggung Jawab</h2>
          <p>Karya Nusantara Realty tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan situs web atau layanan kami, sejauh yang diizinkan oleh hukum yang berlaku.</p>

          <h2>6. Hukum yang Berlaku</h2>
          <p>Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>

          <h2>7. Hubungi Kami</h2>
          <p>Untuk pertanyaan tentang ketentuan ini, silakan hubungi kami di:</p>
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
