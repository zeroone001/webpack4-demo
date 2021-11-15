const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');




let prodConfig = webpackMerge(baseConfig, {

});
module.exports = prodConfig;