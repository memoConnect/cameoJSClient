module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('phonegap:app-prepare', [
        'clean:app-phonegap',
        'app:deploy',
        'copy:resources-phonegap',
        'template:app-index-phonegap',
        'phonegap:app-config',
        'compress:app-zip'
    ]);

    grunt.registerTask('phonegap:to-build-server', [
        'phonegap:app-prepare',
        'phonegap-build:app-upload-zip',
        'copy:phonegap-target',
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
        app: 'dist/phonegap-target/cameoNetApp.zip'
    };

    return {
        tasks:{
            clean: {
                'app-phonegap': [
                    'dist/phonegap',
                    'dist/phonegap-target'
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
                            dest: 'dist/phonegap/www'
                        },
                        // copy all icon and splashs to /www/res
                        {
                            expand: true,
                            cwd: 'resource/phonegap/res/',
                            src: ['**'],
                            dest: 'dist/phonegap/www/res/'
                        }
                    ]
                },
                'phonegap-target': {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/phonegap-target',
                            src: ['*', '!*.zip'],
                            dest: 'dist/dl/'
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
                        'dist/phonegap/www/index.html': ['resource/templates/app/index.html']
                    }
                },
                'app-config-phonegap': {
                    'options': {
                        'data': {
                            'currentName': options.globalCameoBuildConfig.phonegap.baseName + options.globalCameoBuildConfig.phonegap.extraName,
                            'currentVersion': options.globalCameoBuildConfig.phonegap.version,
                            'currentAppId': options.globalCameoBuildConfig.phonegap.bundleId,
                            'logLevel': options.globalCameoBuildConfig.config.logLevel || 'DEBUG',
                            'googleSenderId': options.globalCameoSecrets.google.senderId
                        }
                    },
                    'files': {
                        'dist/phonegap/www/config.xml': ['resource/templates/phonegap/config.xml'],
                        'dist/phonegap/www/config.js': ['resource/templates/phonegap/config.js']
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
                            ios: 'dist/phonegap-target/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa',
                            android: 'dist/phonegap-target/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk',
                            winphone: 'dist/phonegap-target/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.xap'
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
                    cwd: 'dist/phonegap/www/',
                    src: ['**/*']
                }
            }
        }
    }
};