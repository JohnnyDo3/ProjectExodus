import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Project Exodus | Sustainability Hub",
  description: "Your gateway to discovering, learning about, and accessing sustainable alternatives across all aspects of life.",
};

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
      </body>
    </html>
  );
}
