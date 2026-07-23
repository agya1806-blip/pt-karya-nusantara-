import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "PT Karya Nusantara Realty's privacy policy outlines how we collect, use, and protect your personal information.",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">Last updated: January 1, 2025</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Introduction</h2>
          <p>PT Karya Nusantara Realty ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Fill out our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit a project inquiry</li>
            <li>Apply for a job position</li>
            <li>Communicate with us via email or phone</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>To respond to your inquiries and provide architectural services</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To process job applications</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data Protection</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">
            Email: privacy@karya-nusantara.com<br />
            Phone: +62 21 1234 5678<br />
            Address: Jl. Sudirman Kav. 52-53, Jakarta Selatan, 12190
          </p>
        </div>
      </div>
    </section>
  );
}
