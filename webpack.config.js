/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var webpack = require('webpack');
var path = require('path');

var pkg = require('./package.json');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        'main': './src/main.js'
        // 'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(cur|gif|png|jpe?g)$/,
                loader: 'url?limit=8192'
            }
        ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: './',
        filename: '[name].bundle.js?v=' + pkg.version,
        chunkFilename: 'pdf.worker.bundle.js?v=' + pkg.version
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]
};