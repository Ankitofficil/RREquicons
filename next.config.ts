import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js and only the
  // node_modules actually traced as needed. Hostinger's Node.js app hosting
  // runs that file directly, so we never ship the full node_modules tree.
  output: "standalone",

  // Don't advertise the framework to attackers/scanners.
  poweredByHeader: false,

  // Hostinger fronts the Node app with LiteSpeed, which handles gzip/brotli.
  // Leaving Next's own gzip on would compress twice and waste CPU.
  compress: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
