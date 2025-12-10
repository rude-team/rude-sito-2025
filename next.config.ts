import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/asset_sito_rude/**', // Puoi essere più specifico, ma ** è un jolly che copre tutti i percorsi sotto il tuo bucket
      },
    ],
  },
};

export default nextConfig;