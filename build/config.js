const glob = require('glob');
const path = require('path');
const argv = require('yargs').argv;

// npm run build -- --pages=demo1,demo2
console.log('argv', argv.pages);

let pathStr = 'src/pages/*';
/* 
    目的，打包指定项目
    需要按照下面这个格式
    src/pages/+(demo1|demo2)/*.js
*/
// argv.pages === 'demo1,demo2'
if (argv.pages) {
    let arr = argv.pages.split(',');
    pathStr = 'src/pages/+(';
    arr.forEach((item, index) => {
        if (index === (arr.length - 1)) {
            pathStr = pathStr + item + ')';
        } else {
            pathStr = pathStr + item + '|'
        }
    });
}
// console.log('pathStr', pathStr);
/* 
    目的： 整理入口，形成对象的形式
    exp: {文件夹/文件名: 文件路径}
    glob.sync 获取路径
*/
const entries = ((_path) => {
    // let entry
    // https://github.com/isaacs/node-glob
    let filePath = glob.sync(`${_path}/*.js`, {
        // 忽略某些项目,如果想忽略的话，可以把下面的代码打开
        // ignore: ['src/pages/demo2/*.js']
    });
    console.log('filePath', filePath);
    let file = {};
    filePath.forEach((item, index) => {
        // 获取key 
        let chunkName = path.relative('src/pages', item).replace(/\.js$/gi, '');
        // 形成完成的路径
        file[chunkName] = path.resolve(__dirname, '../', item);
    });
    return file;
})(pathStr);

console.log('entries', entries);
module.exports = {
    entries: entries
}