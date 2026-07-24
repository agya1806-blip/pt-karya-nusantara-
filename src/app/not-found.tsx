import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      role="alert"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="mb-6 text-[8rem] font-light leading-none text-neutral-200">
          404
        </span>
        <h1 className="mb-4 text-2xl font-light text-neutral-900">
          Page Not Found
        </h1>
        <p className="mb-8 text-neutral-500">
          The page you are looking for does not exist or has been moved. Please
          check the URL or return to the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-8 py-3.5 text-body-sm font-medium tracking-tight text-white transition-all duration-300 ease-architectural hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
