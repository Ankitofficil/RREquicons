import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only when building the self-contained upload bundle (npm run
  // deploy:package, which sets BUILD_STANDALONE=1). That emits
  // .next/standalone with its own server.js and a trimmed node_modules.
  //
  // Hostinger's "Deploy Web App" builds from the repo and starts the app with
  // `npm start` (= next start), which expects a normal build — so the default
  // build stays non-standalone.
  ...(process.env.BUILD_STANDALONE === "1"
    ? { output: "standalone" as const }
    : {}),

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
