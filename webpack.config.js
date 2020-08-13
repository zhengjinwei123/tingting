const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
console.log(WEBPACK_ENV)

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: WEBPACK_ENV === "dev" ? "/dist/" : "./",
        filename: "js/app.js"
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            page: path.resolve(__dirname, "src/page"),
            component: path.resolve(__dirname, "src/component"),
            utils: path.resolve(__dirname, "src/utils"),
            service: path.resolve(__dirname, "src/service"),
            proto: path.resolve(__dirname, 'src/proto'),
            actions: path.resolve(__dirname, "src/actions"),
            reducers: path.resolve(__dirname, "src/reducers"),
            store: path.resolve(__dirname, "src/store"),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyvars: {
                                    'primary-color': '#1DA57A',
                                    'link-color': '#1DA57A',
                                    'border-radius-base': '2px',
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                WEBPACK_ENV: JSON.stringify("dev")
            }
        })
    ],
    devServer: {
        port:8086,
        historyApiFallback: {
            index: '/dist/index.html',
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8087',
                changeOrigin: true
            }
        }
    }
};