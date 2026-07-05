import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/films/:id",
        destination: "/:id",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.ltrbxd.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
