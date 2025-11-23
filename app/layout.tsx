import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { TimeThemeProvider } from "@/components/providers/TimeThemeProvider";
import { SkyThemeProvider } from "@/components/theme/SkyThemeProvider";
import { SkyBackground } from "@/components/theme/SkyBackground";
import { ProjectExodusAI } from "@/components/ai/ProjectExodusAI";
import { DecorativeBranches } from "@/components/decorative/DecorativeBranches";
import { generateMetadata, siteConfig } from "@/lib/metadata";
import { auth } from "@/auth";

export const metadata: Metadata = generateMetadata({
  title: 'Sustainability Hub',
  description: siteConfig.description,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning style={{
      '--font-geist-sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-geist-mono': '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace'
    } as React.CSSProperties}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem('theme_mode') || 'auto';

                  if (mode === 'morning') {
                    document.documentElement.className = 'day';
                    return;
                  }

                  if (mode === 'night') {
                    document.documentElement.className = 'night';
                    return;
                  }

                  // Auto mode - calculate based on time
                  const coords = JSON.parse(localStorage.getItem('user_coords') || 'null');
                  const now = new Date();

                  if (coords && coords.latitude && coords.longitude) {
                    // Simplified sunrise/sunset calculation for initial load
                    // Full calculation happens in TimeThemeProvider
                    const hour = now.getHours();
                    if (hour >= 5 && hour < 8) {
                      document.documentElement.className = 'sunrise';
                    } else if (hour >= 8 && hour < 18) {
                      document.documentElement.className = 'day';
                    } else if (hour >= 18 && hour < 21) {
                      document.documentElement.className = 'sunset';
                    } else {
                      document.documentElement.className = 'night';
                    }
                  } else {
                    // Fallback to time-based detection
                    const hour = now.getHours();
                    if (hour >= 5 && hour < 8) {
                      document.documentElement.className = 'sunrise';
                    } else if (hour >= 8 && hour < 18) {
                      document.documentElement.className = 'day';
                    } else if (hour >= 18 && hour < 21) {
                      document.documentElement.className = 'sunset';
                    } else {
                      document.documentElement.className = 'night';
                    }
                  }
                } catch (e) {
                  // Default to day theme on error
                  document.documentElement.className = 'day';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <SessionProvider session={session}>
          <TimeThemeProvider>
            <SkyThemeProvider>
              <SkyBackground />
              <DecorativeBranches />
              <div className="relative z-10">
                <Header />
                {children}
                <Footer />
              </div>
              {/* AI Assistant - Available on all pages, auto-greets on homepage */}
              <ProjectExodusAI />
            </SkyThemeProvider>
          </TimeThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
