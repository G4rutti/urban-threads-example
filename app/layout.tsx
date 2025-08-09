import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Urban Threads - Quiet Luxury Fashion",
  description:
    "Discover timeless elegance with our curated collection of premium clothing and accessories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AppProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
