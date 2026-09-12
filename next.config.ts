import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL ?? "https://hookman-backend.onrender.com";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/socket.io/:path*",
        destination: `${BACKEND_URL}/socket.io/:path*`,
      },
    ];
  },
};

export default nextConfig;
