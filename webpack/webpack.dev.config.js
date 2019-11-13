const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js'),
        //添加要打包在vendor里面的库
        vendors: ['react', 'react-dom', 'react-router'],
    },
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: '[name].js',
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
                        loader: 'style-loader', // 创建 <style></style>
                    },
                    {
                        loader: 'css-loader',  // 转换css
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
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
    // devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dev/index.html'), // html模板的生成路径
            template: path.resolve(__dirname, '../public/index.html'),//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),  // 从哪个目录copy
                to: "static", // copy到那个目录
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin()
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
