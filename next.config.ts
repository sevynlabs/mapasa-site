import type { NextConfig } from "next";

/**
 * Dois modos de build:
 *  - padrão (`npm run build`): para a Vercel ou qualquer servidor Node.js.
 *  - estático (`npm run build:static`): gera a pasta `out/` com HTML puro para hospedagens comuns
 *    (Hostinger, cPanel, Locaweb, KingHost etc.). Basta enviar o conteúdo de `out/` para `public_html`.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true, // gera /eucalipto/index.html — funciona em qualquer servidor Apache/Nginx
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              source: "/assets/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
            },
          ];
        },
      }),
};

export default nextConfig;
