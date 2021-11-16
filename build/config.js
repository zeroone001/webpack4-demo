const path = require('path');
const glob = require('glob');
const ip = require('ip');

const envConfig = {
    NODE_ENV: process.env.NODE_ENV,
    ZDM_CI_ENV: process.env.ZDM_CI_ENV
};

console.log(envConfig);
console.log('---------------env---------------');

// 获取入口文件
let entries = (entryPath => {
    let files = {}
    let filesPath = glob.sync(`${entryPath}/*/*.js`, {
        ignore: [`${entryPath}/details/*.js`]
    });
    filesPath.forEach((entry, index) => {
        let chunkName = path.relative(entryPath, entry).replace(/\.js$/i, '');
        files[chunkName] = path.resolve(__dirname, '../', entry);
    });
    return files;
})('src/pages');


module.exports = {
    entries: entries,
    projectRootPath: path.resolve(__dirname, '../'),
    distRootPath: path.resolve(__dirname, '../dist'),
    distOldRootPath: path.resolve(__dirname, '../dist_old'),
    assetsRootPath: path.resolve(__dirname, '../src/assets'),
    nodePath: path.resolve(__dirname, '../node_modules'),
    libPath: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    absolutePath: 'https://res.xxxx.com/app/xxxx/dist/',
    indexPath: 'index.html',
    devPath: `http://${ip.address()}`,
    env: envConfig,
    ip: ip.address(),
    server: {
        port: '8087'
    }
};
