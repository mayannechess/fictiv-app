const path = require("path");

module.exports = {
  entry: "./client/components/app.jsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./client/dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
};