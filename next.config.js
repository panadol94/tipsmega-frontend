/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Wave 2 — old slugs that were removed from blogArticles.ts
      { source: "/download-mega888-apk", destination: "/blog/mega888-apk-download-2026", permanent: true },
      { source: "/kredit-percuma-mega888", destination: "/blog/mega888-free-credit-no-deposit-2026", permanent: true },
      { source: "/mega888-register-malaysia", destination: "/blog/mega888-register-akaun-baru-2026", permanent: true },
      // Wave 2 HOLD — now deployed
      { source: "/blog/mega888-auto-cuci", destination: "/blog/mega888-withdraw-cepat-malaysia-2026", permanent: true },
      { source: "/blog/mega888-download-free-2026", destination: "/blog/mega888-download-panduan-lengkap-2026", permanent: true },
    ];
  },
};

module.exports = nextConfig;