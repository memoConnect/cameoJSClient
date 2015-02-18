module.exports = function (grunt, options) {
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('nw:deploy', [
        'app:deploy',
        'clean:nodeWebkit',
        'copy:nwDeploy',
        'concat:nwScripts',
        'template:nodeWebkitPackage',
        'nodewebkit',
        'copy:nwIconSet',
//        'appdmg',
        'copy:nwPackageLinux',
        'clean:nwPackageLinux',
        'compress:mwPackageLinux'
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
                nwDeploy: {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/desktop',
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
            concat: {
                'options': {
                    separator: '\n'
                },
                'nwScripts': {
                    src: [
                        'resource/nw/*.js'
                    ],
                    dest: 'dist/nodeWebkit/nwScripts.js'
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