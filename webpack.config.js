var path = require('path');
var webpack = require('webpack');

var outputFilename = process.env.TARGET ? path.basename(process.env.TARGET.split('.').slice(0, -1).join('.')) + '.js' : null;
var out = path.resolve(__dirname, 'out');

var polyfillPlugins = [];
var entry = [];

// change this value to enable or disable babel polyfill. using babel will grealy increase the size of the script.
// typescript is recommended for this reason.
var useBabel = false;
if (useBabel) {
    polyfillPlugins.push(new webpack.ProvidePlugin({
        'babel-polyfill': 'global.Promise'
    }));
    entry.push('babel-polyfill');
}

entry.push(process.env.TARGET);

module.exports = {
    entry: entry,
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
