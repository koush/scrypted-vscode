var path = require('path');
var webpack = require('webpack');

var outputFilename = process.env.TARGET ? path.basename(process.env.TARGET.split('.').slice(0, -1).join('.')) + '.js' : null;

module.exports = {
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: outputFilename,
        devtoolModuleFilenameTemplate: function (info) {
            return "../src/" + path.basename(info.absoluteResourcePath);
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
