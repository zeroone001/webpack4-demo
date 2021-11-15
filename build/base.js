const config = require('./config');
const path = require('path');
// console.log('glob', glob);
module.exports = {
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
            }
        ]
    },
    plugins: [
        
    ]
    /* 
    
    */
}