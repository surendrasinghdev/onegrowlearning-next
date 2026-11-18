import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static copy for https://surendrasinghdev.github.io/onegrowlearning-next/
// (see .github/workflows/pages.yml). Static hosting can't run server actions or redirects, so that
// build swaps the email form action for a WhatsApp one and skips the redirects.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/onegrowlearning-next" : "";

// Old Shoolini and Welingkar program pages. Static stand-ins for the Pages build live in src/app/<slug>/.
const removedProgramUrls = [
  "/shoolini-online-mba/",
  "/shoolini-online-mca/",
  "/shoolini-online-ma/",
  "/shoolini-online-bba/",
  "/shoolini-online-bca/",
  "/pg-in-entrepreneurship-welingker-institute/",
  "/pg-media-entertainment-welingkar/",
];

const nextConfig: NextConfig = {
  // Keep the WordPress URL style (/about-us/) so existing links and rankings keep working.
  trailingSlash: true,
  ...(isPages
    ? { output: "export", basePath, images: { unoptimized: true } }
    : {
        async redirects() {
          return [
            { source: "/homepage/", destination: "/", permanent: true },
            // Empty pages removed in the redesign
            { source: "/career-support/", destination: "/", permanent: true },
            { source: "/success-stories/", destination: "/", permanent: true },
            { source: "/resource/", destination: "/", permanent: true },
            // Programs of institutes that aren't Onegrow partners (only MUJ and SMU are)
            ...removedProgramUrls.map((source) => ({ source, destination: "/popular-programs/", permanent: true })),
          ];
        },
      }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_SITE: isPages ? "1" : "",
    // Copyright year, fixed at build time
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  // Partial prerendering isn't allowed in a static export.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    resolveAlias: isPages ? { "@/app/actions": "./src/app/actions.static.ts" } : {},
  },
};

export default nextConfig;
