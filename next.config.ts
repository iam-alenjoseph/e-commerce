import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/e-commerce",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
