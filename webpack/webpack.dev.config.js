const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dev'),
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({// 设置成production去除警告
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dev/index.html'), // html模板的生成路径
            template: path.resolve(__dirname, '../public/index.html'),//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        }),
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
});
