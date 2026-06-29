import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/landing/SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/next"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crema — The OS Behind Great Coffee",
  description:
    "BrewOS is a full-stack café management platform. Orders, staff, inventory, loyalty, and analytics — all connected, all beautiful.",
  keywords: ["coffee shop management", "café software", "POS system", "barista tools"],
  openGraph: {
    title: "Crema — The OS Behind Great Coffee",
    description: "A premium café management platform for independent coffee shops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {/* Fixed grain overlay for editorial texture — never on scrolling containers */}
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
