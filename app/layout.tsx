import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generateMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: 'Sustainability Hub',
  description: siteConfig.description,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{
      '--font-geist-sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-geist-mono': '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace'
    } as React.CSSProperties}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
