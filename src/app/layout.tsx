import type { Metadata } from "next";
import { Amatic_SC, Mukta } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const display = Amatic_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const body = Mukta({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cape Breton Grand Scenic · 8 days around the Cabot Trail",
  description:
    "A supported cycling week looping the Cabot Trail: Acadian villages, highland ridges, whale watches, and the Skyline Trail.",
  openGraph: {
    images: ["/images/hero-original.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
