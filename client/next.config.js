/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.swell.store",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors https://*.builder.io https://builder.io http://localhost:3000 ",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
