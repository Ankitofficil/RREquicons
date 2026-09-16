// Assembles a ready-to-upload deployment bundle in ./deploy from the
// `output: "standalone"` build.
//
// `next build` emits .next/standalone with server.js and a minimal
// node_modules, but deliberately leaves out `public/` and `.next/static`
// (Vercel serves those from a CDN). Self-hosting on Hostinger means we
// serve them from the Node process, so they have to be copied in.
//
// Usage:  npm run deploy:package     (runs next build first)
//         node scripts/package-deploy.mjs --skip-build

import {
  cpSync,
  existsSync,
  rmSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "deploy");
const standalone = path.join(root, ".next", "standalone");

// NEXT_PUBLIC_* values are inlined into the bundle and into the prerendered
// HTML during `next build` — setting them on the server afterwards has no
// effect. Warn loudly if the canonical URL is missing at build time, because
// the fallback would silently ship wrong canonical/OG/sitemap URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  console.warn(
    "! NEXT_PUBLIC_SITE_URL is not set — falling back to https://rrequiconspvtltd.com\n" +
      "  If that is not the production domain, set it before building:\n" +
      "    NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run deploy:package",
  );
} else {
  console.log(`→ Canonical site URL: ${siteUrl}`);
}

if (!process.argv.includes("--skip-build")) {
  // Clear .next first. NEXT_PUBLIC_SITE_URL is inlined into prerendered HTML,
  // and an incremental rebuild reuses cached pages — so changing the domain
  // without a clean build silently keeps the previous one in the output.
  console.log("→ Clearing .next ...");
  rmSync(path.join(root, ".next"), { recursive: true, force: true });

  console.log("→ Building (next build)...");
  // BUILD_STANDALONE switches on output: "standalone" in next.config.ts —
  // only this bundle needs it, so a plain `npm run build` stays compatible
  // with `next start` on a managed host.
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env, BUILD_STANDALONE: "1" },
  });
}

if (!existsSync(standalone)) {
  console.error(
    "✖ .next/standalone not found. Is `output: \"standalone\"` set in next.config.ts?",
  );
  process.exit(1);
}

console.log("→ Assembling ./deploy ...");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// 1. The traced server + its minimal node_modules.
cpSync(standalone, outDir, { recursive: true });

// 2. Hashed client JS/CSS — served at /_next/static/*.
cpSync(path.join(root, ".next", "static"), path.join(outDir, ".next", "static"), {
  recursive: true,
});

// 3. Images and other files served from the site root.
if (existsSync(path.join(root, "public"))) {
  cpSync(path.join(root, "public"), path.join(outDir, "public"), {
    recursive: true,
  });
}

// 4. sharp's native binaries are platform-specific, and file tracing only
// copies the ones for the machine that ran the build. Building on Windows or
// macOS would ship a bundle whose image optimization silently fails on
// Hostinger's Linux server (Next falls back to serving originals unoptimized).
// Fetch the linux-x64 binaries explicitly so the bundle is portable.
const sharpDir = path.join(root, "node_modules", "sharp");
if (existsSync(sharpDir)) {
  const { version } = JSON.parse(
    readFileSync(path.join(sharpDir, "package.json"), "utf8"),
  );
  const target = path.join(outDir, "node_modules", "@img");

  if (existsSync(path.join(target, "sharp-linux-x64"))) {
    console.log("→ sharp linux-x64 binaries already present");
  } else {
    console.log(`→ Fetching sharp linux-x64 binaries (v${version}) ...`);
    const tmp = path.join(root, ".sharp-linux-tmp");
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    writeFileSync(path.join(tmp, "package.json"), '{"name":"t","version":"1.0.0"}\n');
    try {
      // --os/--cpu/--libc declare the target platform; --force is what
      // actually lets npm install a package for a platform it isn't running
      // on (it otherwise refuses with EBADPLATFORM). --ignore-scripts because
      // sharp's install script would try to probe the local machine.
      // sharp-linux-x64 vendors its own matching libvips, so it is the only
      // package needed.
      execSync(
        `npm install --no-save --force --os=linux --cpu=x64 --libc=glibc ` +
          `--ignore-scripts @img/sharp-linux-x64@${version}`,
        { stdio: "pipe", cwd: tmp },
      );
      const from = path.join(tmp, "node_modules", "@img", "sharp-linux-x64");
      if (!existsSync(from)) throw new Error("package did not install");
      cpSync(from, path.join(target, "sharp-linux-x64"), { recursive: true });
      console.log("  ✔ @img/sharp-linux-x64 (linux ELF binaries)");
    } catch (err) {
      console.warn(
        "  ! Could not fetch linux binaries — image optimization may fall back\n" +
          "    to unoptimized originals on the server. Run `npm install sharp`\n" +
          "    on the host, or rebuild on Linux. Details: " +
          String(err.message).split("\n")[0],
      );
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  }
}

// Hostinger's Node.js app manager looks for an entry file and may run
// `npm start` — point both at the standalone server.
const pkg = {
  name: "rr-equicons-site",
  version: "0.1.0",
  private: true,
  scripts: { start: "node server.js" },
};
writeFileSync(
  path.join(outDir, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n",
);

console.log("✔ Bundle ready in ./deploy");
console.log("  Upload the CONTENTS of ./deploy to your Hostinger app root,");
console.log("  set the env vars, and start it with: node server.js");
