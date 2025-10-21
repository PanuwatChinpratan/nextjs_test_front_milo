import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "redux-toolkit": path.resolve(__dirname, "src/lib/redux-toolkit.ts"),
    };
    return config;
  },
};

export default nextConfig;
