## webpack打包优化


###主要从以下几个方面进行：

1. react路由的异步加载

2. css处理

    使用mini-css-extract-plugin把css从bundle包中抽取
    
    使用optimize-css-assets-webpack-plugin压缩css代码
    
    使用postcss-loader，autoprefixer对浏览器兼容性的css代码加前缀
    
3. js的处理

    使用uglifyjs-webpack-plugin代码压缩
    
    拆包，js的bundle包的提取（拆包）
