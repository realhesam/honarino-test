import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
