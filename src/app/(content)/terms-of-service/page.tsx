import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using PT Karya Nusantara Realty's website and services.",
});

export default function TermsOfServicePage() {
  return (
    <section className="py-24">
      <div className="container-site max-w-4xl">
        <h1 className="text-display font-light tracking-tight text-text-primary mb-8">Terms of Service</h1>
        <div className="space-y-6 text-body text-text-secondary leading-relaxed [&_h2]:text-display-sm [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>Last updated: January 1, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the PT Karya Nusantara Realty website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>

          <h2>2. Services</h2>
          <p>PT Karya Nusantara Realty provides architectural design and consulting services. All services are subject to a separate agreement that will outline the specific scope, timeline, and fees for your project.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content on this website, including designs, drawings, text, images, and logos, is the property of PT Karya Nusantara Realty and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

          <h2>4. Website Use</h2>
          <p>You agree to use our website for lawful purposes only. You must not:</p>
          <ul>
            <li>Use the website in any way that violates applicable laws</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Upload malicious code or content</li>
          </ul>

          <h2>5. Limitation of Liability</h2>
          <p>PT Karya Nusantara Realty shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services, to the fullest extent permitted by law.</p>

          <h2>6. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia.</p>

          <h2>7. Contact</h2>
          <p>For questions about these terms, please contact us at:</p>
          <p>
            Email: legal@karya-nusantara.com<br />
            Phone: +62 21 1234 5678<br />
            Address: Jl. Sudirman Kav. 52-53, Jakarta Selatan, 12190
          </p>
        </div>
      </div>
    </section>
  );
}
