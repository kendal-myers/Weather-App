const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'assets');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(SRC_PATH, 'app.js'),
        polyfill: ['@babel/polyfill']
    },
    mode: "development",
    output: {
        path: BUILD_PATH,
        filename: "[name].js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [SRC_PATH, 'node_modules']
    },
    resolveLoader: {
        modules: [path.join(ROOT_PATH, 'node_modules')],
        extensions: ['-loader']
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|\.node_cache)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react', '@babel/flow'],
                    plugins: ['@babel/proposal-class-properties']
                }
            },
            {
                test: /\.css?$/,
                exclude: /(node_modules|\.node_cache)/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather Tracker',
            filename: 'index.html'
        })
    ]
}