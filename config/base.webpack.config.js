const webpack = require('webpack');

const {
    CopyWebpackPlugin
} = require('copy-webpack-plugin');
const {
    FriendlyErrorsWebpackPlugin
} = require('friendly-errors-webpack-plugin');
const {
    HtmlWebpackPlugin
} = require('html-webpack-plugin');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

const tsNameof = require('ts-nameof');

function defaultChunkOptimization(
    name,
    regex,
    priority,
    chunkName = 'main'
) {
    return {
        [name]: {
            name: name,
            chunks: 'all',
            reuseExistingChunk: true,
            priority: priority,
            enforce: true,
            test: (module, chunks) => {
                const modName =
                    module.nameForCondition && module.nameForCondition();
                return chunks.some(chunk => {
                    return chunk.name === chunkName && regex.test(modName);
                });
            }
        }
    };
}

const config = {
    context: '../src',
    entry: {
        main: '../src/main.ts'
    },
    output: {
        path: '../dist',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                use: [{
                    loader: 'tslint-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: () => ({
                            before: [tsNameof]
                        })
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: '../src',
        open: true,
        quiet: true,
        clientLogLevel: 'none',
        overlay: {
            warnings: false,
            errors: true
        }
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    externals: {
        jquery: 'jQuery',
        angular: 'angular'
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false
        }),
        new CopyWebpackPlugin([{
                from: 'App/**/*.html'
            },
            {
                from: '../node_modules/angular/angular.min.js'
            },
            {
                from: '../node_modules/jquery/dist/jquery.min.js'
            }
        ]),
        new FriendlyErrorsWebpackPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                ...defaultChunkOptimization(
                    'vendor',
                    /[\\/]node_modules[\\/]/,
                    1
                )
            }
        }
    }
};

module.exports = config;