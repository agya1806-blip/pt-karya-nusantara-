import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "PT Karya Nusantara Realty's privacy policy outlines how we collect, use, and protect your personal information.",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24">
      <div className="container-site max-w-4xl">
        <h1 className="text-display font-light tracking-tight text-text-primary mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-body text-text-secondary leading-relaxed [&_h2]:text-display-sm [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>Last updated: January 1, 2025</p>

          <h2>1. Introduction</h2>
          <p>PT Karya Nusantara Realty ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit a project inquiry</li>
            <li>Apply for a job position</li>
            <li>Communicate with us via email or phone</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To respond to your inquiries and provide architectural services</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To process job applications</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Data Protection</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: privacy@karya-nusantara.com<br />
            Phone: +62 21 1234 5678<br />
            Address: Jl. Sudirman Kav. 52-53, Jakarta Selatan, 12190
          </p>
        </div>
      </div>
    </section>
  );
}
