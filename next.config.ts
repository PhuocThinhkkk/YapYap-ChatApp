import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    experimental: {
        useCache: true,
    },
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "red-bitter-bee-95.mypinata.cloud",
            port: "",
            pathname: "/**",
            search: "",
        },],
    },
};

export default nextConfig;
