var path = require('path');
var webpack = require('webpack');

var outputFilename = process.env.TARGET ? path.basename(process.env.TARGET.split('.').slice(0, -1).join('.')) + '.js' : null;
var out = path.resolve(__dirname, 'out');

var polyfillPlugins = [];
var entry = [];

entry.push(process.env.TARGET);

module.exports = {
    entry: entry,
    output: {
        path: out,
        filename: outputFilename,
        devtoolModuleFilenameTemplate: function (info) {
            return path.relative(out, info.absoluteResourcePath);
        },

        // export everything to a var "window" which is really just an alias for exports.
		libraryTarget: "window",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }

        ]
    },

    plugins: polyfillPlugins,


    stats: {
        colors: true
    },
    optimization: {
        // can not minimize since duktape only does line based breakpoints
        minimize: false,
    },
    devtool: 'nosources-source-map'
};
