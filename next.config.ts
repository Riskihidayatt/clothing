import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder images are served from Unsplash's CDN, which already
    // resizes and converts formats — so we use a custom loader instead of
    // proxying them through the Next.js optimizer.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
