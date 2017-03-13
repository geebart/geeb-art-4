'use strict';

var scriptFiles = [
    'js/**/*.js'
];

module.exports = function (grunt) {

    // Show how long each task takes to execute
    require('time-grunt')(grunt);

    // Load tasks as needed
    require('jit-grunt')(grunt);

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({

        // Get package information
        project: require('./project.json'),

        // Watch for changes
        watch: {
            js: {
                files: ['app/js/*.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files:['app/css/*.css'],
                tasks:['cssmin'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: ['app/work/*.html', 'app/index.html', 'app/resume/*.html', 'app/present/*.html'],
                tasks: ['htmlmin'],
                options: {
                    livereload: true,
                }
            },
            font: {
                files: ['app/fonts/*'],
                tasks: ['copy'],
                options: {
                    livereload: true,
                }
            }
        },

        // Minify JS
        uglify: {
            docs: {
              files: [{
                  expand: true,
                  cwd: 'app/js',
                  src: ['*.js'],
                  dest: 'docs/js',
                  ext: '.js'
              }]
            }
        },

        // Minify CSS
        cssmin: {
            docs: {
                // options: {
                //     keepSpecialComments: 0,
                //     roundingPrecision: 10
                // },
                files: [{
                    expand: true,
                    cwd: 'app/css',
                    src: ['*.css'],
                    dest: 'docs/css',
                    ext: '.css'
                }]
            }
        },

        // Minify HTML
        htmlmin: {
            docs: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: 'index.html',
                    dest: 'docs',
                },
                {
                    expand: true,
                    cwd: 'app/work',
                    src: '*.html',
                    dest: 'docs/work',
                },
                {
                    expand: true,
                    cwd: 'app/resume',
                    src: '*.html',
                    dest: 'docs/resume',
                },
                {
                    expand: true,
                    cwd: 'app/present',
                    src: '*.html',
                    dest: 'docs/present',
                }]
            },
        },

        copy: {
            docs: {
                files: [{
                    expand: true,
                    cwd: 'app/fonts',
                    src: ['*.ttf', '*.woff', '*.svg', '*.eot'],
                    dest: 'docs/fonts',
                },
                {
                    expand: true,
                    cwd: 'app/easter',
                    src: ['egg.html'],
                    dest: 'docs/easter',
                },
                 {
                    expand: true,
                    cwd: 'app',
                    src: ['favicon.ico'],
                    dest: 'docs',
                }]
            }
        },

        connect: {
            server: {
              options: {
                protocol: 'http',
                port: 8080,
                keepalive: true,
                open: true,
                base: {
                    path: 'docs',
                    options: {
                        index: 'index.html',
                    },
                },
              },
              keepalive: true,
            },
          },
    });

    // BASICS
    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin', 'copy']);

    // SPECIAL TASKS
    grunt.registerTask('server', ['connect']);

    // GRUNT CONTRIB
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //SERVER
    grunt.loadNpmTasks('grunt-contrib-connect');

};
