import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // SECURITY: unsafe-inline and unsafe-eval needed for Next.js dev mode and some dynamic features
              // TODO: Remove unsafe-inline/unsafe-eval and use nonces for production in a future update
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://js.pusher.com https://stats.pusher.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow images from Cloudinary and other CDNs
              "img-src 'self' data: https: blob: https://res.cloudinary.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.pusher.com wss://*.pusher.com https://sockjs*.pusher.com https://*.cloudinary.com https://*.partykit.dev wss://*.partykit.dev ws://localhost:* http://localhost:*",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  }
};

export default nextConfig;
