/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  eslint: {
    // We don't ship ESLint as a dependency; skip linting during production builds.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
