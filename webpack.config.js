const
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    cssFiles = [];

module.exports = {

    entry: path.resolve(__dirname, './src/Base/main.ts'),

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/',
                        publicPath: '/assets/images/',
                    }
                }]
            },
            {
                test: /.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'assets/css/',
                            publicPath: '/assets/css/',
                            postTransformPublicPath: (path) => {
                                return `document.write('<link rel="stylesheet" type="text/css" href=${path} />');`;
                            }
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },

    performance: {hints: false},

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            Assets: path.resolve(__dirname, 'assets'),
            Base: path.resolve(__dirname, 'src/Base'),
            Components: path.resolve(__dirname, 'src/Components')
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 24284
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: 'assets/js/bundle.js'
    }
};
