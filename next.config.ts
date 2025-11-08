import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
const nextConfig: NextConfig = {
  /* config options here */

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    },
};

export default nextConfig;
