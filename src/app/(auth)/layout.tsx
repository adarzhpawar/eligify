import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-eg-background)]">
      {/* Minimal header — just the logo */}
      <header className="w-full flex items-center justify-center py-8">
        <Link href="/">
          <Image
            src="/eligify-text-icon.png"
            alt="Eligify AI"
            width={300}
            height={90}
            className="w-[160px] md:w-[200px] h-auto object-contain"
            priority
          />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center w-full max-w-[1440px] mx-auto px-5 md:px-16 pb-12">
        {children}
      </main>
    </div>
  );
}
