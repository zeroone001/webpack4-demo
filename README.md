# webpack4-demo


很多依赖需要安装特定版本了，因为很多都更新到支持webpack5了

### 链接

* [官网](https://v4.webpack.docschina.org/concepts/)
* [详细配置](https://v4.webpack.docschina.org/configuration)

### 目的

写一个webpack4 + vue@2.x， 现在公司最常用的配置，

但不是最新的配置，之后还会写一个webpack5的

### 技术

* webpack5
* vue@2.x
* babel
* eslint


#### 安装

```shell
npm install webpack@4 webpack-cli@3 webpack-dev-server@3 --save-dev
npm install webpack-merge webpack-manifest-plugin --save-dev
```

获取command 命令参数,  用于自定义页面打包

```shell
npm i yargs@13 --save-dev
```

### clean-webpack-plugin

`npm i clean-webpack-plugin@^0.1.19 -D`

```js
// 打包前删除dist文件夹
new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'),
    verbose: false, // 输出log到控制台
    dry: false // 模拟删除
}),
```

### compression-webpack-plugin

`npm i compression-webpack-plugin@2 -D`


### cross-env

`npm i cross-env -D`


### mini-css-extract-plugin

`npm i mini-css-extract-plugin@^0.8.0 -D`

### Setup

1. entry

2. output


### webpack.UglifyjsWebpackPlugin


这个是Webpack官方维护，用Uglifyjs进行代码压缩的插件。它使用的是单线程压缩代码，也就是说多个js文件需要被压缩，它需要一个个文件进行压缩。所以说在正式环境打包压缩代码速度非常慢(因为压缩JS代码需要先把代码解析成用Object抽象表示的AST语法树，再去应用各种规则分析和处理AST，导致这个过程耗时非常大)。优点是支持老项目，对于维护比较老的项目，是较优的选择


```js
// npm i uglifyjs-webpack-plugin
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
  ]
}
```

### webpack.TerserWebpackPlugin

[https://webpack.docschina.org/plugins/terser-webpack-plugin/#parallel](https://webpack.docschina.org/plugins/terser-webpack-plugin/#parallel)

```js
// npm install terser-webpack-plugin --save-dev
optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            parallel: true,
            cache: true, // 新版本已经去掉这个选项了
            terserOptions: {
                ecma: 5,
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                module: false,
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
                safari10: true,
                format: {
                    comments: false, // 删除注释
                },
            }
        })
    ]
}


```




