import type { Metadata } from "next";
import "./globals.css";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "커리어렌즈 | 데이터 기반 커리어 인사이트",
    template: "%s | 커리어렌즈",
  },
  description:
    "채용 시장 데이터를 분석하여 커리어 인사이트를 제공하는 블로그입니다. 프론트엔드, 백엔드, AI 등 IT 채용 트렌드를 다룹니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "커리어렌즈",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <GNB />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
