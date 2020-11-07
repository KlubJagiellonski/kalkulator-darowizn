const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('WEBPACK CONFING', __dirname);

const mode = process.env.NODE_ENV;

const config = {
    name: 'kj-darowizny-config',
    mode: 'production',
    devtool: mode === 'development' ? 'cheap-module-source-map' : undefined,
    entry: {
        form: ['./src/form/donation-form.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        logLevel: 'info',
                    },
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        path: path.join(__dirname, mode === 'development' ? './build' : './prod'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            minify: false,
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            module: 'form',
        }),
        new CopyWebpackPlugin(['src/form/form.html']),
    ],
};

module.exports = config;
