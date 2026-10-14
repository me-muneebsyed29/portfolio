import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The first three case studies were anonymised placeholders. Their URLs may
     already be known to Google, so they point at the real studies they were
     standing in for rather than 404ing. */
  async redirects() {
    return [
      { source: "/work/devtools-saas-cac", destination: "/work/jetlearn", permanent: true },
      { source: "/work/vertical-saas-scale", destination: "/work/jetlearn", permanent: true },
      { source: "/work/enterprise-abm", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
