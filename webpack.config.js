const path = require("path");

module.exports = {
  entry: "./app/assets/images/Scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    before: function(app, server) {
      server._watch("./app/**/*html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
