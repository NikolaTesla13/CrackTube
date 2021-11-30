import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "path";

export default merge(common, {
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(process.cwd(), "public"),
    port: 9000,
  },
  mode: "development",
});
