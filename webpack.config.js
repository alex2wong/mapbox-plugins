const path = require('path');

module.exports = {
    entry: {
        index: [
            "./src/index.js"
            ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
	    library: 'Mapbox',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
        {
            // extention: ".js",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.html$/,
            exclude: /(node_modules)/,
            loader: 'html-loader'
        }, {
            test: /\.sass$/,
            exclude: /(node_modules)/,
            loader: 'sass-loader'
        }, {
            test: /\.css$/,
            exclude: /(node_modules)/,
            loader: 'style-loader'
        }]
    },
    plugins: [
        // new CleanWebpackPlugin(['./src/build/bundle.js'], {
        //     root: '',
        //     verbose: true,
        //     dry: false
        // })
    ]
};
