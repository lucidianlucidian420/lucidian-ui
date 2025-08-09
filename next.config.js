/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [{ source: '/', destination: '/lucidian.html', permanent: false }];
  },
};
module.exports = nextConfig;
