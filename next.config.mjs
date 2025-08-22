/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com", 
      "localhost", 
      "eshal-ayzal.vercel.app" // ✅ add your admin domain
    ],
  },
};

export default nextConfig;
