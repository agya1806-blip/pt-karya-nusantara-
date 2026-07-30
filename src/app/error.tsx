"use client";

import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      role="alert"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="mb-6 text-[8rem] font-light leading-none text-neutral-200">
          500
        </span>
        <h1 className="mb-4 text-2xl font-light text-neutral-900">
          Terjadi Kesalahan
        </h1>
        <p className="mb-8 text-neutral-500">
          Terjadi kesalahan yang tidak terduga. Silakan coba lagi atau hubungi
          kami jika masalah berlanjut.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center border border-gold-500 bg-gold-500 px-8 py-3 text-sm font-medium tracking-wider text-white transition-colors hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 uppercase"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
