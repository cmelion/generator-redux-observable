'use strict';

// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var npmConfig = require('./package.json').config;
var hotMiddleWarePort = npmConfig.clientPort;

var DEFAULT_TARGET = 'app';
var target = process.env.TARGET || DEFAULT_TARGET;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) {
        args = [args];
    }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val;
        }));
    }, ['']);
}

module.exports = (function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};
    var isTestEnv = ENV === 'test' || ENV === 'test-watch';
    var isE2ETestEnv = ENV === 'e2e-test-server';

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTestEnv) {
        config.devtool = 'inline-source-map';
    } else if (ENV === 'build') {
        config.devtool = false;
    } else {
        config.devtool = 'cheap-module-eval-source-map';
    }

    // add debug messages
    config.debug = ENV !== 'build' || !isTestEnv;

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = isTestEnv || ENV === 'build' ?
        {
            app: [ './src/app/index.jsx'],
            vendor: [
                './src/vendor.js'
            ]
        } :
        [
            'webpack-dev-server/client?http://localhost:' + hotMiddleWarePort,
            './src/vendor.js',
            './src/app/index.jsx'
        ];

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = isTestEnv ? {} : {
        path: root('dist'),
        publicPath: '',
        filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: ENV === 'build' ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        cache: !isTestEnv,
        root: root(),
        // only discover files that have those extensions
        extensions: prepend(['.jsx', '.js', '.json', '.css', '.scss', '.html'], '.async'), // ensure .async.js etc also works
        alias: {
            'app': 'src/app',
            'common': 'src/common'
        }
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        preLoaders: isTestEnv || isE2ETestEnv ? [] : [{test: /\.js$/, loader: 'eslint'}],
        exprContextCritical : false,
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.scss/,
                loaders: ['style', 'css', 'scss']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.woff\d?(\?.+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?.+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?.+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: [/MaterialIcons-Regular.eot/, /MaterialIcons-Regular.woff2/, /MaterialIcons-Regular.woff/, /MaterialIcons-Regular.ttf/],
                loader: 'file?name=fonts/[name].[ext]'
            }
        ],
        postLoaders: [],
        noParse: [/quill.js/]
    };

    if (isE2ETestEnv) {
        // instrument only testing sources with Istanbul, covers js compiled files for now :-/
        config.module.preLoaders.push({
            test: /\.jsx?$/,
            include: path.resolve('src'),
            loader: 'babel-istanbul',
            exclude: [/\.?spec\.js$/, /\.e2e\.js$/, /node_modules/, /test/]
        });
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV),
                NODE_ENV: JSON.stringify(ENV === 'build' ? 'production' : 'development')
            }
        }),

        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body',
            title: 'App - ' + target
        })
    ];

    if (!isTestEnv) {
        config.plugins.push(
            // Generate common chunks if necessary
            // Reference: https://webpack.github.io/docs/code-splitting.html
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            new CommonsChunkPlugin({
                name: 'vendor',
                filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
                minChunks: Infinity
            }),
            new CommonsChunkPlugin({
                name: 'common',
                filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
                minChunks: 2,
                chunks: ['app', 'vendor']
            }),

            // Inject script and link tags into html files
            // Reference: https://github.com/ampedandwired/html-webpack-plugin

            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body',
                title: 'App - ' + target,
                chunksSortMode: function compare(a, b) {
                    // common always first
                    if (a.names[0] === 'common') {
                        return -1;
                    }
                    // app always last
                    if (a.names[0] === 'app') {
                        return 1;
                    }
                    // vendor before app
                    if (a.names[0] === 'vendor' && b.names[0] === 'app') {
                        return -1;
                    } else {
                        return 1;
                    }
                    // a must be equal to b
                    /* eslint-disable no-unreachable */
                    return 0;
                    /* eslint-disable no-unreachable */
                }
            }),

            new webpack.DefinePlugin({
                __WEBPACK__: true, // say we're the webpack
                __DEV__: process.env.BUILD_DEV // dev environment indication
            }),

            // Extract css files
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin('css/[name].[hash].css', {disable: ENV !== 'build'})
        );
    }

    // Add build specific plugins
    if (ENV === 'build') {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({
                // to debug prod builds uncomment //debug lines and comment //prod lines

                // beautify: true,//debug
                // mangle: false,//debug
                // dead_code: false,//debug
                // unused: false,//debug
                // deadCode: false,//debug
                // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
                // comments: true,//debug

                beautify: false,//prod
                mangle: {
                    screw_ie8: true,
                    except: ['RouterLink'] // needed for uglify RouterLink problem
                },// prod
                compress: {screw_ie8: true},//prod
                comments: false//prod
            }),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: root('src/public')
            }])
        );
    }

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files to .css
     */
    config.sassLoader = {
        includePaths: [path.resolve(__dirname, './node_modules/material-design-lite/src')]
    };
    /**
     * Apply the tslint loader as pre/postLoader
     * Reference: https://github.com/wbuchwalter/tslint-loader
     */
    config.tslint = {
        emitErrors: false,
        failOnHint: false
    };

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        port: hotMiddleWarePort,
        contentBase: './src/public',
        historyApiFallback: true,
        stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
        proxy: [
            {path: npmConfig.baseURL + '*', target:'http://localhost:' + npmConfig.apiPort},
            {path:'/login', target:'http://localhost:' + npmConfig.apiPort}
        ]
    };

    return config;
}());
