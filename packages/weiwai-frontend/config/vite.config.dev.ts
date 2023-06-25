import { mergeConfig } from "vite";
import baseConfig from "../vite.config";

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: false,
      host: '0.0.0.0',
      fs: {
        strict: true,
      },
    },
  },
  baseConfig
);
