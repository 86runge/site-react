const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
    mode:'production',
    output: {
        path: path.resolve(__dirname, '../prod'),
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),  // 从哪个目录copy
                to: "../prod/static", // copy到那个目录
                ignore: ['.*']
            }
        ]),
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env':{
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../prod/index.html'), // html模板的生成路径
            template: path.resolve(__dirname, '../src/index.html'),//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            //  html 文件进行压缩
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性引用
            }
        }),
        // 自定义js优化配置，将会覆盖默认配置
        new UglifyJsPlugin({
            parallel: true,  //使用多进程并行运行来提高构建速度
            sourceMap: true,
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
    ]
});
