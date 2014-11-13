module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('phonegap:app-prepare', [
        'clean:app-phonegap',
        'phonegap:app-to-build-dir',
        'compress:app-zip'
    ]);

    grunt.registerTask('phonegap:app-to-build-dir', [
        'app:deploy',
        'copy:resources-phonegap',
        'template:app-index-phonegap',
        'phonegap:app-config'
    ]);

    grunt.registerTask('phonegap:to-build-server', [
        'phonegap:app-prepare',
        'phonegap-build:app-upload-zip',
        'testflight:iOS',
        'app:create-download-page'
    ]);

    grunt.registerTask('phonegap:create-only-zip', [
        'phonegap:app-prepare',
        'phonegap-build:app-only-zip'
    ]);

    grunt.registerTask('phonegap:app-config', [
        'template:app-config-phonegap'
    ]);


    var archive = {
        app: 'dist/dl/cameoNetApp.zip'
    };

    return {
        tasks:{
            clean: {
                'app-phonegap': [
                    'dist/dl',
                    'dist/phonegap',
                    'dist/phonegap-target',
                    'build/phonegap',
                    'build/phonegap-target'
                ]
            },
            copy: {
                'resources-phonegap': {
                    files: [
                        {
                            expand: true,
                            flatten: false,
                            cwd: 'dist/app',
                            src: ['**'],
                            dest: 'build/phonegap/www'
                        },
                        // copy all icon and splashs to /www/res
                        {
                            expand: true,
                            cwd: 'resource/phonegap/res/',
                            src: ['**'],
                            dest: 'build/phonegap/www/res/'
                        }
                    ]
                }
            },
            template: {
                'app-index-phonegap': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'phonegapFiles': '<script type="text/javascript" charset="utf-8" src="cordova.js"></script>' +
                                '<script type="text/javascript" charset="utf-8" src="config.js"></script>' +
                                (options.globalCameoBuildConfig.debug.weinre ? '<script src="http://' + options.globalCameoBuildConfig.debug.weinreIp + ':8080/target/target-script-min.js#anonymous"></script>' : ''),
                            'phonegapOnload': ' onload="deviceReady()"'
                        }
                    },
                    'files': {
                        'build/phonegap/www/index.html': ['app/index.html']
                    }
                },
                'app-config-phonegap': {
                    'options': {
                        'data': {
                            'currentName': options.globalCameoBuildConfig.phonegap.baseName + options.globalCameoBuildConfig.phonegap.extraName,
                            'currentVersion': options.globalCameoBuildConfig.phonegap.version,
                            'currentAppId': options.globalCameoBuildConfig.phonegap.bundleId,
                            'logLevel': options.globalCameoBuildConfig.config.logLevel || 'DEBUG',
                            'googleSenderId': options.globalCameoSecrets.google.senderId,
                            'appProtocol': options.globalCameoBuildConfig.static.appProtocol,
                            'androidDebuggable': options.globalCameoBuildConfig.phonegap.androidDebuggable || "false"
                        }
                    },
                    'files': {
                        'build/phonegap/www/config.xml': ['resource/templates/phonegap/config.xml'],
                        'build/phonegap/www/config.js': ['resource/templates/phonegap/config.js']
                    }
                }
            },
            'phonegap-build': {
                'app-upload-zip': {
                    options: {
                        archive: archive.app,
                        appId: options.globalCameoBuildConfig.phonegap.appId,
                        user: {
                            email: options.globalCameoSecrets.phonegap.email,
                            password: options.globalCameoSecrets.phonegap.password
                        },
                        download: {
                            ios: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa',
                            android: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk',
                            winphone: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.xap'
                        }
                    }
                },
                'app-only-zip': {
                    options: {
                        archive: archive.app,
                        appId: options.globalCameoBuildConfig.phonegap.appId
                    }
                }
            },
            compress: {
                'app-zip': {
                    options: {
                        archive: archive.app,
                        mode: 'zip'
                    },
                    expand: true,
                    cwd: 'build/phonegap/www/',
                    src: ['**/*']
                }
            }
        }
    }
};