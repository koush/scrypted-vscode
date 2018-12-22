var path = require('path');
var webpack = require('webpack');

var outputFilename = process.env.TARGET ? path.basename(process.env.TARGET.split('.').slice(0, -1).join('.')) + '.js' : null;
var out = path.resolve(__dirname, 'out');

module.exports = {
    output: {
        path: out,
        filename: outputFilename,
        devtoolModuleFilenameTemplate: function (info) {
            return path.relative(out, info.absoluteResourcePath);
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }

        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'babel-polyfill': 'global.Promise'
        })
    ],


    stats: {
        colors: true
    },
    optimization: {
        minimize: false
    },
    devtool: 'nosources-source-map'
};
