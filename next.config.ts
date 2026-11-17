import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the WordPress URL style (/about-us/) so existing links and rankings keep working.
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/homepage/", destination: "/", permanent: true },
      // Empty pages removed in the redesign
      { source: "/career-support/", destination: "/", permanent: true },
      { source: "/success-stories/", destination: "/", permanent: true },
      { source: "/resource/", destination: "/", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
