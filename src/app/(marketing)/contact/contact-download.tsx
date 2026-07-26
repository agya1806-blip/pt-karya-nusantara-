"use client";

import { ContactFormWrapper } from "@/sections";
import { DownloadProfile } from "@/forms";

export function ContactDownloadSection() {
  return (
    <section className="bg-surface-secondary py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactFormWrapper
            title="Kirim Pesan untuk Kami"
            description="Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 24 jam."
          />
          <div>
            <DownloadProfile
              onDownload={async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              profileUrl="/files/company-profile.pdf"
            />
          </div>
        </div>
      </div>
    </section>
  );
}