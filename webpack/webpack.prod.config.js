const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
    mode:'production',
    output: {
        path: path.resolve(__dirname, '../prod'),
    },
    plugins: [
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env':{
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../prod/index.html'), // html模板的生成路径
            template: path.resolve(__dirname, '../public/index.html'),//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            //  html 文件进行压缩
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性引用
            }
        }),
        new CleanWebpackPlugin()
    ]
});
