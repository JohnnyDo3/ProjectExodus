import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { TimeThemeProvider } from "@/components/providers/TimeThemeProvider";
import { SkyThemeProvider } from "@/components/theme/SkyThemeProvider";
import { SkyBackground } from "@/components/theme/SkyBackground";
import { ProjectExodusAI } from "@/components/ai/ProjectExodusAI";
import { DecorativeBranches } from "@/components/decorative/DecorativeBranches";
import { generateMetadata, siteConfig } from "@/lib/metadata";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";
import { DigitalScrollProvider } from "@/components/learning/DigitalScroll/DigitalScrollContext";
import { SageProvider } from "@/components/ai/SageContext";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

// Viewport configuration for mobile responsiveness
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#36763d' },
    { media: '(prefers-color-scheme: dark)', color: '#223e25' },
  ],
};

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Sustainability Hub',
    description: siteConfig.description,
  }),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

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
        {/* Google Fonts - Caveat for handwritten style in learning canvas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const prefs = JSON.parse(localStorage.getItem('project_exodus_theme_prefs') || '{}');
                  const mode = prefs.mode || 'auto';

                  if (mode === 'morning') {
                    document.documentElement.className = 'day';
                    return;
                  }

                  if (mode === 'night') {
                    document.documentElement.className = 'night';
                    return;
                  }

                  // Auto mode - calculate based on time
                  const coords = (prefs.latitude && prefs.longitude) ? { latitude: prefs.latitude, longitude: prefs.longitude } : null;
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
              <DigitalScrollProvider>
                <SageProvider>
                  <MainLayoutWrapper
                    skyBackground={<SkyBackground />}
                    decorativeBranches={<DecorativeBranches />}
                    aiAssistant={<ProjectExodusAI />}
                  >
                    {children}
                  </MainLayoutWrapper>
                </SageProvider>
                {/* Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      border: '2px solid var(--border)',
                      fontWeight: '600',
                    },
                    success: {
                      iconTheme: {
                        primary: 'var(--primary)',
                        secondary: 'white',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'var(--destructive)',
                        secondary: 'white',
                      },
                    },
                  }}
                />
                {/* PWA Install Prompt */}
                <PWAInstallPrompt />
              </DigitalScrollProvider>
            </SkyThemeProvider>
          </TimeThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
