import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import * as tsNameof from 'ts-nameof';

const config: webpack.Configuration = {
    context: '../src',
    entry: {
        main: '../src/main.ts'
    },
    output: {
        path: '../dist',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({
                                before: [tsNameof]
                            })
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                })
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
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            'MPM/Constants': appResolve('Constants.ts'),
            'MPM/Security': appResolve('Models/Security/index.ts'),
            'MPM/Services': appResolve('Services/index.ts'),
            'MPM/Utilities': appResolve('Utilities/index.ts'),
            'MPM/Controllers': appResolve('Controllers/index.ts'),
            'MPM/DataTransfers': appResolve('Models/DataTransfers/index.ts'),
            'MPM/Enums': appResolve('Models/Enums/index.ts'),
            'MPM/Entities': appResolve('Models/Entities/index.ts'),
            'MPM/Interfaces': appResolve('Models/Interfaces/index.ts'),
            'MPM/Directives': appResolve('Directives/index.ts'),
            'MPM/Views': appResolve('Views/index.ts'),
            'MPM/Routing': appResolve('Routing/index.ts'),
            'MPM/Filters': appResolve('Filters/index.ts'),
            globalize: rootResolve('node_modules/globalize/dist/globalize'),
            cldr: rootResolve('node_modules/cldrjs/dist/cldr')
        }
    },
    externals: {
        jquery: 'jQuery',
        angular: 'angular',
        '@itsynch/itsynch-common/itsynch-common': 'ITsynch.Common',
        '@itsynch/itsynch-loading/itsynch-loading':
            'ITsynch.AngularModules.Loading',
        '@itsynch/itsynch-institutional/itsynch-institutional':
            'ITsynch.Institutional',
        '@itsynch/itsynch-listbuilder/itsynch-listbuilder':
            'ITsynch.ListBuilder',
        '@itsynch/itsynch-magicsuggest/itsynch-magicsuggest':
            'ITsynch.MagicSuggest',
        '@itsynch/itsynch-javascript-sdk-ui-bootstrap/itsynch-javascript-sdk-ui-bootstrap':
            'ITsynch.Core'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            { from: 'App/**/*.html' },
            { from: 'web.config' },
            { from: 'config.js' },
            { from: nodeModulesResolve('angular/angular.min.js') },
            { from: nodeModulesResolve('jquery/dist/jquery.min.js') }
        ]),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.ProvidePlugin({
            Globalize: 'globalize'
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                ...defaultChunkOptimization(
                    'itsynch',
                    /[\\/]node_modules[\\/]@itsynch[\\/]/,
                    2
                ),
                ...defaultChunkOptimization(
                    'devextreme',
                    /[\\/]node_modules[\\/]devextreme[\\/]/,
                    3
                ),
                ...defaultChunkOptimization(
                    'vendor',
                    /[\\/]node_modules[\\/]/,
                    1
                )
            }
        }
    }
};

export default config;
