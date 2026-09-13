import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * /workshops became /next-steps in draft 9 of docs/copy.md. The old URL was
   * live and sat in the sitemap, so it redirects permanently (308) rather than
   * 404ing.
   */
  redirects() {
    return [
      {
        source: '/workshops',
        destination: '/next-steps',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
