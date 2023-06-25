import { join, resolve } from "path";
import megaDesktopConfig from "./config/mega.desktop.config.json";
import { authenticateSwitch } from "./src/authenticate";
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const publicPath = NODE_ENV === "development" ? "http://localhost:30010/" : "/systemManage/"
process.env.COMPRESS = "none";
if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified."
  );
}
export default {
  hash: false,
  disableCSSModules: true,
  cssModulesWithAffix: true,
  entry: "./src/index.js",
  publicPath,
  // publicPath: "http://localhost:30010/",
  alias: {
    "@": join(__dirname, "./src"),
    "@components": join(__dirname, "./src/components"),
    "@utils": join(__dirname, "./src/components/utils"),
    "@services": join(__dirname, "./src/services"),
  },
  dllDependenciesExcludes: [],
  extraBabelIncludes: [/decamelize/],
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "@lugia/lugia-web",
        libraryDirectory: "dist",
      },
      "@lugia/lugia-web",
    ],
    [
      "import",
      {
        libraryName: "@/components",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "@/components",
    ],
    [
      "import",
      {
        libraryName: "@ysstech-data/data-web",
        libraryDirectory: "dist",
      },
      "@ysstech-data/data-web",
    ],
    [
      "import",
      {
        libraryName: "@ysstech-data/data-web-bussiness",
        libraryDirectory: "dist",
      },
      "@ysstech-data/data-web-bussiness",
    ],
    [
      "import",
      {
        libraryName: "@ysstech-data/data-web-business",
        libraryDirectory: "dist",
      },
      "@ysstech-data/data-web-business",
    ],
    [
      "import",
      {
        libraryName: "@ysstech-data/ssf-fida-bussiness",
        libraryDirectory: "dist",
      },
      "@ysstech-data/ssf-fida-bussiness",
    ],
    [
      "import",
      {
        libraryName: "@/models",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "@/models",
    ],
  ],
  applyWebpack(webpackConfig, { webpack, merge }) {
    webpackConfig.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: resolve(__dirname, "./scripts/clearConsole.js")
      }],
    })
    return {
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        path: resolve(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        library: "systemManage",
        libraryTarget: "window",
      },
    };
  },
  generator(api) {
    const {
      appPath,
      pkg: { version },
    } = api.getApp();
    const verbose = api.isVerbose();
    const { fs, mergeObj } = api._utils();

    fs.writeJSONSync(
      join(appPath, "./config/mega.desktop.config.json"),
      mergeObj(megaDesktopConfig, {
        extraMega: {
          engines: {
            scaffolding: { version },
          },
        },
      }),
      {
        spaces: 2,
      }
    );

    if (verbose) {
      console.log(
        `update scaffolding(${megaDesktopConfig.extraMega.engines.scaffolding.name}) version: ${version}`
      );
    }

    api.mergePackage((pkg) => {
      delete pkg.files;
      return {
        ...pkg,
        version: "1.0.0",
        private: true,
      };
    });
  },
  ...megaDesktopConfig,

  proxy: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    "/yapi/api/oauth2": {
      // target: "http://192.168.100.158:30000/",
      target: "http://192.168.103.35:30000/",
      changeOrigin: true,
      pathRewrite: {
        "^/yapi/api/oauth2": "/api/oauth2",
      },
    },

    "/yapi/api/manager": {
      // target: authenticateSwitch
      //   ? "http://192.168.100.158:30000/"
      //   : "http://192.168.100.161:30010",
      target: "http://192.168.103.35:30000/",
      changeOrigin: true,
      pathRewrite: {
        "^/yapi/api/manager": "/api/manager",
      },
    },
  },
};
