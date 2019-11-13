const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: '[name][hash:8].js',
        publicPath: "/" // 打包后的资源的访问路径前缀
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '../src')
        },
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true,
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {importLoaders: 1}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader:MiniCssExtractPlugin.loader,
                    options: {
                        reloadAll:true,
                        hmr: process.env.NODE_ENV === 'development',
                    }
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),  // 从哪个目录copy
                to: "static", // copy到那个目录
                ignore: ['.*']
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true } // 移除注释
            }
        }),
        // 自定义js优化配置，将会覆盖默认配置
        new UglifyJsPlugin({
            parallel: true,  //使用多进程并行运行来提高构建速度
            sourceMap: false,
            uglifyOptions: {
                warnings: false,
                compress: {
                    unused: true,
                    drop_debugger: true,
                    drop_console: true,
                },
                output: {
                    comments: false // 去掉注释
                }
            }
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        compress: true, // 一切服务都启用gzip 压缩：
        host: 'localhost',
        port: "3001", // 指定段靠谱
        publicPath: "/", // 访问资源加前缀
        proxy: {
            // 接口请求代理
        },
    },
};
