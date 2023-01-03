const webpack = require('webpack');

const webExtensionConfig = {
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    target: 'webworker', // extensions run in a webworker context
    entry: './main.js',
    output: {
        filename: './browser.js',
        path: __dirname,
        libraryTarget: 'commonjs'
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1 // disable chunks by default since web extensions must be a single bundle
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser', // provide a shim for the global `process` variable
        }),
    ],
    externals: {
        'vscode': 'commonjs vscode', // ignored because it doesn't exist
    },
    performance: {
        hints: false
    },
    devtool: 'nosources-source-map', // create a source map that points to the original source file
};

module.exports = [ webExtensionConfig ];