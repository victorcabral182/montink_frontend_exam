import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dcdn.mitiendanube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
