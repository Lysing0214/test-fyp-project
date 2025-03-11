import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development', // Disable in development mode
// });

// module.exports = withPWA({
//   reactStrictMode: true,
// });

// export default nextConfig;

import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

