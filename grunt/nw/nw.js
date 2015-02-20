module.exports = function (grunt, options) {
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('nw:deploy', [
        'nw:create-dist',
        'nodewebkit',
        'copy:nwIconSet',
//        'appdmg',
        'copy:nwPackageLinux',
        'clean:nwPackageLinux',
        'compress:mwPackageLinux'
    ]);

    grunt.registerTask('nw:nw-desktop-deploy', [
        'copy:nwDeploy',
        'copy:nw-desktop-files',
        'template:nw-config-js',
        'template:nw-desktop',
        'nw:create-webworker',// webworker.js
        'nw:create-style-via-less',// less.js
        'nw:packages'//packages.js
    ]);

    grunt.registerTask('nw:create-dist', [
        'clean:nodeWebkit',
        'nw:nw-desktop-deploy',
        'template:nodeWebkitPackage'
    ]);

    return {
        tasks: {
            clean: {
                nodeWebkit: {
                    src: [
                        'dist/nodeWebkit/**',
                        'build/nodeWebkit/**'
                    ]
                },
                nwPackageLinux: {
                    src: [
                        'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64/!(bin|*.sh)'
                    ]
                }
            },
            copy: {
                'nw-desktop-files': {
                    files: [
                        {
                            src: 'core/favicon.ico',
                            dest: 'dist/nodeWebkit/favicon.ico'
                        },
                        {
                            expand: true,
                            cwd: 'core/gfx/',
                            src: ['**'],
                            dest: 'dist/nodeWebkit/gfx/'
                        },
                        {
                            expand: true,
                            cwd: 'core/i18n/',
                            src: ['**'],
                            dest: 'dist/nodeWebkit/i18n/'
                        },
                        {
                            expand: true,
                            cwd: 'core/performance/',
                            src: ['**'],
                            dest: 'dist/nodeWebkit/performance/'
                        },
                        {
                            expand: true,
                            flatten: true,
                            cwd: 'core/css/fonts/',
                            src: ['**'],
                            dest: 'dist/nodeWebkit/css/fonts'
                        },
                        {
                            expand: true,
                            flatten: false,
                            cwd: 'resource/download/gfx/',
                            src: ['**'],
                            dest: 'dist/nodeWebkit/gfx/'
                        }
                    ]
                },
                nwDeploy: {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/nodeWebkit',
                            src: '**/*',
                            dest: 'dist/nodeWebkit'
                        }
                    ]

                },
                nwIconSet: {
                    src: "resource/iconSet/cameoNet.icns",
                    dest: "build/nodeWebkit/" + options.globalCameoBuildConfig.phonegap.baseName + "/osx/" + options.globalCameoBuildConfig.phonegap.baseName + ".app/Contents/Resources/nw.icns"
                },
                nwPackageLinux: {
                    files: [
                        {
                            expand: true,
                            cwd: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64',
                            src: '**/*',
                            dest: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64/bin'
                        },
                        {
                            expand: true,
                            cwd: 'resource/templates/nodeWebkit',
                            src: '**/*.sh',
                            dest: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64'
                        }
                    ],
                    options: {
                        mode: true
                    }
                }
            },
            compress: {
                mwPackageLinux: {
                    options: {
                        archive: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64/' + options.globalCameoBuildConfig.phonegap.baseName + '-linux-x64.tar.gz',
                        mode: 'tgz'
                    },
                    expand: true,
                    cwd: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '/linux64/',
                    src: ['**/*'],
                    dest: '/'
                }
            },
            nodewebkit: {
                options: {
                    platforms: ['win', 'osx', 'linux64'],
                    buildDir: 'build/nodeWebkit'
                },
                src: ['dist/nodeWebkit/**/*']
            },
            template: {
                'nodeWebkitPackage': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'appBaseName': options.globalCameoBuildConfig.phonegap.baseName
                        }
                    },
                    'files': {
                        'dist/nodeWebkit/package.json': ['resource/templates/nodeWebkit/package.json']
                    }
                },
                'nw-desktop':{
                    'options': {
                        'data': {
                            'currentTarget': options.globalCameoBuildConfig.target,
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'currentApiUrl': options.globalCameoBuildConfig.config.apiUrl,
                            'defaultApiVersion': options.globalCameoBuildConfig.config.defaultApiVersion,
                            'autoLogin': options.globalCameoBuildConfig.config.autoLogin,
                            'loadingBar': options.globalCameoBuildConfig.config.loadingBar,
                            'enableDebug': options.globalCameoBuildConfig.config.enableDebug,
                            'performancePage': options.globalCameoBuildConfig.config.performancePage,
                            'errorOnTodoInI18n': options.globalCameoBuildConfig.config.errorOnTodoInI18n,
                            'nwFiles': '<script type="text/javascript" charset="utf-8" src="config.js"></script>',

                            'static': JSON.stringify(options.globalCameoBuildConfig.static)
                        }
                    },
                    'files': {
                        'dist/nodeWebkit/index.html': ['desktop/index.html'],
                        'dist/nodeWebkit/icons.html': ['core/icons.html'],
                        'build/nodeWebkit/base/config.js': ['desktop/base/config.js'],
                        'dist/nodeWebkit/performance.html': ['core/performance.html']
                    }
                },
                'nw-config-js':{
                    'options': {
                        'data': {
                            'isNodeWebkit': true
                        }
                    },
                    'files': {
                        'dist/nodeWebkit/config.js': ['resource/nodeWebkit/config.js']
                    }
                }
            },
            appdmg: {
                options: {
                    title: 'cameoNet for MacOSX',
                    icon: 'resource/iconSet/cameoNet.icns',
                    background: 'resource/iconSet/background.png',
                    "icon-size": 80,
                    contents: [
                        {x: 448, y: 344, type: 'link', path: '/Applications'},
                        {x: 192, y: 344, type: 'file', path: "build/nodeWebkit/" + options.globalCameoBuildConfig.phonegap.baseName + "/osx/" + options.globalCameoBuildConfig.phonegap.baseName + ".app"}
                        <!-- {x: 512, y: 128, type: 'file', path: 'path/to/extra-file.txt'}-->
                    ]
                },
                target: {
                    dest: 'build/nodeWebkit/' + options.globalCameoBuildConfig.phonegap.baseName + '-' + options.globalCameoBuildConfig.config.version + '.dmg'
                }
            }
        }
    }
};