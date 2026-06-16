import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pillow/best-pillow-for-side-sleepers-uk",
        destination: "/pillow/best-pillow-for-side-sleepers",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-back-sleepers-uk",
        destination: "/pillow/best-pillow-for-back-sleepers",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-stomach-sleepers-uk",
        destination: "/pillow/best-pillow-for-stomach-sleepers",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-combination-sleepers-uk",
        destination: "/pillow/best-pillow-for-combination-sleepers",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-neck-pain-uk",
        destination: "/pillow/best-pillow-for-neck-pain",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-snoring-uk",
        destination: "/pillow/best-pillow-for-snoring",
        permanent: true,
      },
      {
        source: "/pillow/best-pillow-for-allergies-uk",
        destination: "/pillow/best-pillow-for-allergies",
        permanent: true,
      },
      {
        source: "/pillow/best-cooling-pillow-uk",
        destination: "/pillow/best-cooling-pillow",
        permanent: true,
      },
      {
        source: "/pillow/best-memory-foam-pillow-uk",
        destination: "/pillow/best-memory-foam-pillow",
        permanent: true,
      },
      {
        source: "/pillow/best-down-pillow-uk",
        destination: "/pillow/best-down-pillow",
        permanent: true,
      },
      {
        source: "/pillow/best-budget-pillow-uk-under-30",
        destination: "/pillow/best-budget-pillow-under-30",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
