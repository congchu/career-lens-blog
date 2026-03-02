"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GNB() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-primary">
          커리어렌즈
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#series"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname.startsWith("/series")
                ? "text-primary"
                : "text-gray-600"
            }`}
          >
            시리즈
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
          >
            소개
          </Link>
        </div>
      </nav>
    </header>
  );
}
