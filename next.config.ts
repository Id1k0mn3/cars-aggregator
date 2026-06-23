import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "/**",
        protocol: "http",
      },
      {
        hostname: "127.0.0.1",
        pathname: "/**",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
