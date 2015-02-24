module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('phonegap:build-only', [
        'phonegap:app-prepare',
        'phonegap:app-config-local',
        'phonegap:build'
    ]);

    grunt.registerTask('phonegap:build-n-run', [
        'phonegap:app-prepare',
        'phonegap:app-config-local',
        'phonegap:build',
        'phonegap:run'
    ]);

    grunt.registerTask('crosswalk:build', [
        'phonegap:app-prepare',
        'phonegap:app-config-local-crosswalk',
        'phonegap:build',
        'generate-ant-properties',
        'shell:compileCrosswalk',
        'crosswalk:copy-to-dl'
    ]);

    grunt.registerTask('crosswalk:build-step', [
        'phonegap:app-config-local-crosswalk',
        'phonegap:build',
        'generate-ant-properties',
        'shell:compileCrosswalk',
        'crosswalk:copy-to-dl'
    ]);

    grunt.registerTask('crosswalk:copy-to-dl', function () {
        if (options.globalCameoBuildConfig.target == "default") {
            grunt.task.run('copy:crosswalk-unsigned')
        } else {
            grunt.task.run('copy:crosswalk-signed')
        }
    })

    grunt.registerTask('generate-ant-properties', function () {
        if (options.globalCameoBuildConfig.target != "default") {
            grunt.task.run('template:cordova-ant-properties')
        }
    })

    function genPlugins(useRepo) {
        var plugins = options.globalCameoPhonegapConfig.plugins,
            array = [];

        plugins.forEach(function (plugin) {
            if ('repo' in plugin) {
                var repo = grunt.template.process(plugin.repo, {
                    data: {
                        'appProtocol': options.globalCameoBuildConfig.static.appProtocol
                    }
                });
                array.push(repo);
            } else {
                var version = plugin.version;
                if(plugin.localVersion) {
                    version = plugin.localVersion;
                }
                array.push(plugin.name + "@" + version);
            }
        });

        return array;
    }

    return {
        tasks: {
            copy: {
                'resources-phonegap-local': {
                    files: [
                        {
                            expand: true,
                            cwd: 'resource/phonegap/res/',
                            src: ['**'],
                            dest: 'build/phonegap-tmp/res/'
                        }
                    ]
                },
                'crosswalk-signed': {
                    files: [
                        {
                            expand: true,
                            cwd: 'build/phonegap-tmp/platforms/android/ant-build/',
                            src: ['*-release.apk'],
                            dest: 'dist/dl/',
                            rename: function(dest, src) {
                                return dest  + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk';
                            }
                        }
                    ]
                },
                'crosswalk-unsigned': {
                    files: [
                        {
                            expand: true,
                            cwd: 'build/phonegap-tmp/platforms/android/ant-build/',
                            src: ['*-release-unsigned.apk'],
                            dest: 'dist/dl/',
                            rename: function(dest, src) {
                                return dest  + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk';
                            }
                        }
                    ]
                }

            },
            phonegap: {
                // https://www.npmjs.org/package/grunt-phonegap
                config: {
                    root: 'build/phonegap/www',
                    config: 'build/phonegap/www/config.xml',
                    cordova: 'resource/phonegap/.cordova',
                    path: 'build/phonegap-tmp',
                    plugins: genPlugins(true),
                    platforms: [
                        'android'
//                        'ios'
                    ],

                    maxBuffer: 1000, // You may need to raise this for iOS.
                    verbose: true,
                    releases: 'releases',

                    releaseName: function () {
                        var pkg = grunt.file.readJSON('package.json');
                        return (pkg.name + '-' + pkg.version);
                    },
                    name: function () {
                        var pkg = grunt.file.readJSON('package.json');
                        return pkg.name;
                    },
                    versionCode: function () {
                        return (1)
                    },
                    minSdkVersion: function () {
                        return (15)
                    },
                    targetSdkVersion: function () {
                        return (15)
                    }
                }
            },
            shell: {
                compileCrosswalk: {
                    options: {
                        stdout: false
                    },
                    command: './compileCrosswalk.sh'
                }
            },
            template: {
                'cordova-ant-properties': {
                    'options': {
                        'data': {
                            storePath: "../../../../../cameoAndroidKeys/" + options.globalCameoSecrets.android.keyStoreName,
                            storePassword: options.globalCameoSecrets.android.KeyStorePassword,
                            alias: options.globalCameoSecrets.android.keyAliasName,
                            aliasPassword: options.globalCameoSecrets.android.keyAliasPassword
                        }
                    },
                    'files': {
                        'build/phonegap-tmp/ant.properties': ['resource/phonegap/ant.properties']
                    }
                }
            }

        }
    }
};