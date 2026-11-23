import type { NextConfig } from "next";

// GitHub Pages serves project repos from /<repo-name>. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH automatically; it stays empty for a <user>.github.io repo.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
