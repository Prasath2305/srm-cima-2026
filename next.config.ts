// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;







import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  reactStrictMode: true,
  
  // If you're using images from external sources
  images: {
    domains: [], // Add any external image domains here
  },
};

export default nextConfig;
