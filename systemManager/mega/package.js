/**
 * Copyright (c) 2018-present, YSSTech, Inc.
 *
 * @emails lugia@ysstech.com
 * @author zenjava
 */
process.env.NODE_ENV = "production";
process.env.__FROM_TEST = true;
process.env.ESLINT = "none";
process.env.TSLINT = "none";
process.env.COMPRESS = "none";

const build = require("@lugia/lugia-package-models").default;

const { join } = require("path");

const projectPath = join(__dirname, "../");

build({
  importModules: [
    {
      libraryName: "@lugia/lugia-web",
      libraryDirectory: "dist"
    }
  ],
  projectPath,
  generateConfigFile: true,
  buildPath: "./dist/model"
});
