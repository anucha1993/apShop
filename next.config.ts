import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server (server.js + traced node_modules) for Plesk / Passenger.
  output: "standalone",
  images: {
    // Unsplash's CDN resizes for us, so the server never needs `sharp` (which is platform-specific).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
