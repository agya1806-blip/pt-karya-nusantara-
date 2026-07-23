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
        <span className="mb-6 text-[10rem] font-light leading-none text-neutral-200">
          404
        </span>
        <h1 className="mb-4 text-3xl font-light text-neutral-900">
          Page Not Found
        </h1>
        <p className="mb-8 text-neutral-500">
          The page you are looking for does not exist or has been moved. Please
          check the URL or return to the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-medium tracking-wider text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 uppercase"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
