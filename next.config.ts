import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    experimental: {
        useCache: true,
        ppr: 'incremental',
    }
};

export default nextConfig;
