/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba/Kidoju-Platform
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

module.exports = function (grunt) {

    var cheerio = require('cheerio');
    var webpack = require('webpack');
    var webpackConfig = require(__dirname + '/webpack.config.js');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            viewer: ['./viewer/*']
        },
        copy: {
            viewer: {
                files: [
                    { expand: true, cwd: 'web/cmaps', src: '**', dest: 'viewer/cmaps' },
                    { expand: true, cwd: 'web/images', src: '**', dest: 'viewer/images' },
                    { expand: true, cwd: 'web/locale', src: '**', dest: 'viewer/locale' }
                ]
            },
            html: {
                src: 'web/viewer.html',
                dest: 'viewer/index.html',
                options: {
                    process: function (content, srcpath) {
                        var $ = cheerio.load(content);
                        $('.openFile').remove();
                        $('head').find('link[rel="stylesheet"][href="viewer.css"]').remove();
                        $('head').find('script[src="compatibility.js"]').remove();
                        $('head').find('script[src="l10n.js"]').remove();
                        $('head').find('script[src="../build/pdf.js"]').remove();
                        $('head').find('script[src="debugger.js"]').remove();
                        $('head').find('script[src="viewer.js"]').remove();
                        $('head').append('<script src="./main.bundle.js?v=0.0.1" ></script>'); // TODO version from pkg
                        return $.html();
                    }
                }
            },
            js: {
                src: 'web/viewer.js',
                dest: 'src/viewer.js',
                options: {
                    process: function (content, srcpath) {
                        return content
                            .replace('compressed.tracemonkey-pldi-09.pdf', '../docs/User%20Guide.en.pdf?v=0.0.1') // TODO version from pkg
                            .replace('appConfig.toolbar.openFile.addEventListener(', '// appConfig.toolbar.openFile.addEventListener(')
                            .replace('  SecondaryToolbar.openFileClick.bind(', '//   SecondaryToolbar.openFileClick.bind(')
                            // .replace('./images/', './images/')
                            .replace('../build/pdf.worker.js', './pdf.worker.bundle.js?v=0.0.1')
                            .replace('../web/cmaps/', './cmaps/');
                    }
                }
            }
        },
        webpack: {
            // @see https://github.com/webpack/webpack-with-common-libs/blob/master/Gruntfile.js
            options: webpackConfig,
            build: {
                // cache: false,
                plugins: webpackConfig.plugins
            }
        }
    });

    // Build
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    // Commands
    grunt.registerTask('build', ['clean', 'copy', 'webpack']);
    grunt.registerTask('default', ['build']);
};