const webpack = require("webpack"),
    _ = require("lodash"),
    path = require("path"),
    fs = require("fs"),
    env = require("./utils/env"),
    { VueLoaderPlugin } = require("vue-loader"),
    CopyWebpackPlugin = require("copy-webpack-plugin");

const vendor = "chrome";

var options = {
    entry: {
        whiteboard: path.join(__dirname, "client", "main.js"),
    },
    output: {
        path: path.join(__dirname, "client", "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
    mode: env.NODE_ENV === "development" ? "development" : "production",
    devServer: {
        /*
        https: {
            key: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
            cert: fs.readFileSync(path.join(__dirname, "certs", "cert.crt")),
            cacert: fs.readFileSync(path.join(__dirname, "certs", "cert.crt")),
        },
        */
        static: path.join(__dirname, "build"),
        devMiddleware: {
            writeToDisk: true,
        },
        //watchFiles: "src",
        hot: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        //static: "./",
        host: "localhost",
        port: 3001,
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            //vue: "vue/dist/vue.js",
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    // enable CSS Modules
                                    modules: {
                                        auto: () => true,
                                    },
                                },
                            },
                        ],
                    },
                    // this matches plain `<style>` or `<style scoped>`
                    {
                        use: ["vue-style-loader", "css-loader"],
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
                exclude: /node_modules/,
            },
        ],
    },
};

options.plugins = [
    new VueLoaderPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: "client/index.html",
            },
            /*
                {
                    from: "src/img",
                },
                */
        ],
    }),
];

// Set up options for development
if (env.NODE_ENV === "development") {
    options.devtool = "inline-source-map";
    const ExtensionReloader = require("webpack-extension-reloader"),
        { CleanWebpackPlugin } = require("clean-webpack-plugin");
}

module.exports = [options];
