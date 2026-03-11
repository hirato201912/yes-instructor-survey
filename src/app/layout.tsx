import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yes-instructor-survey.vercel.app"),
  title: "スキル＆興味シート | 糸島学習塾 YES",
  description: "糸島学習塾YESの講師スキル調査アンケートです。",
  icons: {
    icon: "/orange_right.jpg",
    apple: "/orange_right.jpg",
  },
  openGraph: {
    title: "スキル＆興味シート | 糸島学習塾 YES",
    description: "糸島学習塾YESの講師スキル調査アンケートです。",
    images: [
      {
        url: "/orange_right.jpg",
        width: 820,
        height: 1000,
        alt: "糸島学習塾YES キャラクター",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
