/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/access-requests",
        destination: "http://localhost:8080/access-requests",
      },
    ];
  },
};

module.exports = nextConfig;
