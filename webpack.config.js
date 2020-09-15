const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const TerserJSPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


let WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
console.log(WEBPACK_ENV)

let plugins = [
    new HtmlWebpackPlugin({
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            minifyCSS: true// 压缩内联css
        },
        inject: 'body',
        hash: true,
        filename: 'index.html',//输出文件的名称
        template: path.resolve(__dirname, 'src/index.html'),//模板文件的路径
        favicon: './favicon.ico',
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(WEBPACK_ENV === "dev" ? "dev" : "production"),
            WEBPACK_ENV: JSON.stringify(WEBPACK_ENV),
            IMAGE_HOST: JSON.stringify(WEBPACK_ENV === "dev" ? "127.0.0.1:9000" : "114.215.194.155:9000"),
            API_HOST: JSON.stringify(WEBPACK_ENV === "dev" ? "127.0.0.1:8089" : "114.215.194.155:8089"),
            WEB_NAME: JSON.stringify("小码哥")
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
        filename: "css/[name].css"
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map'
    })
]

if (WEBPACK_ENV !== "dev") {
    console.log("add clean webpack plugin")
    plugins.unshift(new CleanWebpackPlugin())
}

var mode= WEBPACK_ENV === "dev" ? "development" : "production"

console.log("mode:", mode)
module.exports = {
    mode: mode,
    entry: "./src/app.jsx",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath:  "/dist/",
        filename: "[name].bundle.js",
        chunkFilename: "js/[name].[contenthash:8].chunk.js"
    },
    resolve: {
        extensions: ['.js'],
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
                test: /\.(jsx|js|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: "style-loader"
                    },
                    use: [
                        {
                            loader: "css-loader",
                        },{
                            loader: 'postcss-loader',
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                // exclude: /node_modules/,
                // use:[ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: "sass-loader"
                        }
                        ]
                }),
                // exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use:[ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 8192,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 8192,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    optimization: {
        usedExports: true,
        minimize: true,
        runtimeChunk: true,
        minimizer: [new TerserJSPlugin({
            terserOptions: {
                output: {
                    comments: false,
                },
            },
            extractComments: false,
        }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10
                },
                utils: {
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minChunks: 2,   // 引用次数最少两次
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    plugins: plugins,
    devServer: {
        hot: true,
        port:8086,
        historyApiFallback: {
            index: '/dist/index.html',
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8089',
                secure: false,
                changeOrigin: true
            },
            '/pub': {
                target: 'http://127.0.0.1:8089',
                changeOrigin: true,
                secure: false,
            }
        }
    }
};