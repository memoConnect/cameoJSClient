module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('app:deploy', [
        'app:deploy-without-template',
        'app:gen-all-templates',

        'cockpit:deploy-without-template',

        'desktop:deploy-without-template',
        'desktop:gen-all-templates',

        'uglify:app-deploy',
        'cssmin:app-deploy'
    ]);

    grunt.registerTask('app:deployNW', [
        'app:deploy',
        'clean:nodeWebkit',
        'copy:nwDeploy',
        'template:nodeWebkitPackage',
        'nodewebkit'
    ]);

    return {
        tasks: {
            uglify: {
                options: {
                    mangle: false
                },
                'app-deploy': {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/app',
                            src: '**/*.js',
                            dest: 'dist/app'
                        },
                        {
                            expand: true,
                            cwd: 'dist/cockpit',
                            src: '**/*.js',
                            dest: 'dist/cockpit'
                        },
                        {
                            expand: true,
                            cwd: 'dist/desktop',
                            src: '**/*.js',
                            dest: 'dist/desktop'
                        }
                    ]
                }
            },
            cssmin: {
                'app-deploy': {
                    expand: true,
                    cwd: 'dist/app',
                    src: '*.css',
                    dest: 'dist/app'
                }
            },
            clean: {
                nodeWebkit: {
                    src: [
                        'dist/nodeWebkit/**',
                        'build/nodeWebkit/**'
                    ]}
            },
            copy: {
                nwDeploy: {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/desktop',
                            src: '**/*',
                            dest: 'dist/nodeWebkit'
                        }
                    ]

                }
            },
            nodewebkit: {
                options: {
                    platforms: ['win', 'osx'],
                    buildDir: 'build/nodeWebkit'
                },
                src: ['dist/nodeWebkit/**/*']
            },
            template: {
                'nodeWebkitPackage': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version
                        }
                    },
                    'files': {
                        'dist/nodeWebkit/package.json': ['resource/templates/nodeWebkit/package.json']
                    }
                }
            }

        }
    }
};