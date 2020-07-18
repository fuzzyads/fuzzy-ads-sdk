const path = require('path');

module.exports = {
    entry: {
        'fuzzy-web3-sdk': './src/index.js',
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