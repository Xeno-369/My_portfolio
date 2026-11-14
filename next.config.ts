import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        // Troisième morceau du flag caché (voir le terminal du site : `ctf`).
        headers: [{ key: "X-Xeno-Flag", value: "3/3 _ch3ck_th3_h34d3rs}" }],
      },
    ];
  },
};

export default nextConfig;
