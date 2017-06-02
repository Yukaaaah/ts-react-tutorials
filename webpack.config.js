var path = require('path');
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === "production";
var CopyWebpackPlugin = require.main.require('copy-webpack-plugin');

var config = module.exports = {
    entry: "./src/app.js",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        pathinfo: true,
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?name=imgs/[name].[ext]&limit=10240'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    //'svg-url-loader'
                    'inline-loader'
                ]
                //loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=img/[name].[ext]'
            }
        ]
    },

    resolve: {
        extensions: ['.css', '.js'],
        modules: [
            path.resolve(path.join(__dirname, "src")),
            path.resolve(path.join(__dirname, "css")),
            path.resolve(path.join(__dirname, "node_modules"))
        ]
    },

    resolveLoader: {
        modules: [path.resolve(path.join(__dirname, 'node_modules'))]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process": "(" + JSON.stringify({env: {NODE_ENV: process.env.NODE_ENV}}) + ")"
        }),
        new CopyWebpackPlugin([{
            from: 'index.html',
            to: 'index.html'
        }])
    ]
};

if (isProduction) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));

    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    config.devtool = 'sourcemap';
    config.stats = {errorDetails: true};
}