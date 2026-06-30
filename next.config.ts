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
        hostname: "localhost",
        pathname: "/**",
        port: "8000",
        protocol: "http",
      },
      {
        hostname: "127.0.0.1",
        pathname: "/**",
        protocol: "http",
      },
      {
        hostname: "127.0.0.1",
        pathname: "/**",
        port: "8000",
        protocol: "http",
      },
      {
        hostname: "167.99.241.255",
        pathname: "/**",
        protocol: "http",
      },
    ],
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        destination: "http://167.99.241.255/:path*",
        source: "/backend/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
        source: "/(.*)",
      },
    ];
  },
};

export default nextConfig;
