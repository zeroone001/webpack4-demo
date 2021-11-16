const config = require('./config');
const path = require('path');
/* 提取CSS为独立的文件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
// console.log('glob', glob);
const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};
module.exports = {
    mode: 'production',
    /* 
        多页应用
        entry: string, object, array
        这一次使用数组的形式，打包多个项目
    */
    entry: config.entries,
    output: {
        filename: '[name].[contentHash:7].js',
        // 最后打包放置的文件夹的路径
        path: path.resolve(__dirname, '../', 'dist'),
        // 最后HTML里面的script的src的路径
        // 对资源使用CDN
        publicPath: '/'
    },
    performance: { // https://www.webpackjs.com/configuration/performance/
        maxAssetSize: 400000,
        maxEntrypointSize: 800000 // 先改大点没有警告, 动态加载后会变小
    },
    resolve: {
        extensions: ['.js', '.scss', '.json', '.vue'], // 自动解析后缀, 引入文件时无需写后缀
        modules: [ // webpack解析模块搜索的目录
            'node_modules',
        ],
        alias: { // 别名, 缩短引用路径
        }
    },
    // loader
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    remove: false
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/, // 它会应用到普通的 `.js` 文件, 以及 `.vue` 文件中的 `<script>` 块
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    resolvePath('src'),
                ]
            },
        ]
    },
    plugins: [
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            // threshold: 10240, // 这个是限制大小的, 超过10K再压缩， 仅处理大于此大小的。以字节为单位
            // minRatio: 0.8
        }),
        // 打包前删除dist文件夹
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: false, // 输出log到控制台
            dry: false // 模拟删除
        }),
    ]
    /* 
    
    */
}