const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: './bundle.min.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.ttf$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new MonacoWebpackPlugin()
    ]
};
