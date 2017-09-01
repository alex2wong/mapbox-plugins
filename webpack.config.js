module.exports = {
    entry: {
        index: [
            "./src/index.js"
            ]
    },
    output: {
        path: "./dist",
        filename: "bundle.js",
	    library: 'Alex',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
        {
            // extention: ".js",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
            // query: {
            //     compact: false
            // }
        },
        {
            test: /\.html$/,
            exclude: /(node_modules)/,
            loader: 'raw'
        }, {
            test: /\.sass$/,
            exclude: /(node_modules)/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/,
            exclude: /(node_modules)/,
            loader: 'style!css'
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
