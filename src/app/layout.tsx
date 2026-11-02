import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Thai } from "next/font/google";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StoreHydrator } from "@/components/StoreHydrator";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-thai",
  display: "swap",
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "APSHOP — เสื้อผ้ามินิมอลพรีเมียม", template: "%s | APSHOP" },
  description: "ร้านเสื้อผ้าออนไลน์สไตล์มินิมอล คุณภาพพรีเมียม สำหรับผู้หญิง ผู้ชาย และยูนิเซ็กส์",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={`${inter.variable} ${thai.variable} ${display.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <StoreHydrator />
      </body>
    </html>
  );
}
