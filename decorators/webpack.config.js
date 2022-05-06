module.exports = {
    mode:"development",
    entry: "./dist/app.js",
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true
    },
    devtool: "hidden-source-map",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist/build"),
        filename: '[name].[hash].bundle.js'
    },

}
