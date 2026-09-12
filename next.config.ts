import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
      {
        source: "/socket.io/:path*",
        destination: `${process.env.BACKEND_URL}/socket.io/:path*`,
      },
    ];
  },
};

export default nextConfig;
