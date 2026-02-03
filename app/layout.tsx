import "./globals.css";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";

const almarai = localFont({
  src: [
    { path: "../public/fonts/Almarai_Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Almarai_Bold.ttf", weight: "700", style: "normal" }
  ],
  variable: "--font-arabic",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap"
});

export const metadata = {
  title: "Dahhan Dent",
  description: "Dahhan Dent Center"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${almarai.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
