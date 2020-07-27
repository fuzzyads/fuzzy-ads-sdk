const path = require('path');

module.exports = {
    entry: {
        'fuzzy-ads-sdk': './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: __dirname,
        publicPath: '/dist/',
        disableHostCheck: true
    },
};