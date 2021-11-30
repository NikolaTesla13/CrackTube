import path from "path";

export default {
  node: {
    __dirname: true,
  },
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
