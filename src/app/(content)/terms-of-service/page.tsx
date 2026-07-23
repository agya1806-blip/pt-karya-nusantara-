import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using PT Karya Nusantara Realty's website and services.",
});

export default function TermsOfServicePage() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">Last updated: January 1, 2025</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the PT Karya Nusantara Realty website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Services</h2>
          <p>PT Karya Nusantara Realty provides architectural design and consulting services. All services are subject to a separate agreement that will outline the specific scope, timeline, and fees for your project.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Intellectual Property</h2>
          <p>All content on this website, including designs, drawings, text, images, and logos, is the property of PT Karya Nusantara Realty and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Website Use</h2>
          <p>You agree to use our website for lawful purposes only. You must not:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use the website in any way that violates applicable laws</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Upload malicious code or content</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Limitation of Liability</h2>
          <p>PT Karya Nusantara Realty shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services, to the fullest extent permitted by law.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Contact</h2>
          <p>For questions about these terms, please contact us at:</p>
          <p className="mt-2">
            Email: legal@karya-nusantara.com<br />
            Phone: +62 21 1234 5678<br />
            Address: Jl. Sudirman Kav. 52-53, Jakarta Selatan, 12190
          </p>
        </div>
      </div>
    </section>
  );
}
