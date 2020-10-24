const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/preview.js",
    "./js/picture.js",
    "./js/filter.js",
    "./js/move.js",
    "./js/success-error.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
