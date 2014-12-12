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
        'template:phonegap-index-html',
        'phonegap:app-config'
    ]);

    grunt.registerTask('phonegap:to-build-server', [
        'phonegap:app-prepare',
        'phonegap-build:app-upload-zip',
        'testflight:ios',
        'download-page:create'
    ]);

    grunt.registerTask('phonegap:create-only-zip', [
        'phonegap:app-prepare',
        'phonegap-build:app-only-zip'
    ]);

    grunt.registerTask('phonegap:app-config', [
        'template:phonegap-config-xml',
        'template:phonegap-config-js'
    ]);

    grunt.registerTask('phonegap:app-config-local', [
        'template:phonegap-config-xml-local',
        'template:phonegap-config-js'
    ]);

    var archive = {
        app: 'dist/dl/cameoNetApp.zip'
    };

    function configXMLData(isLocal){
        return {
            'currentName': options.globalCameoBuildConfig.phonegap.baseName + options.globalCameoBuildConfig.phonegap.extraName,
            'currentVersion': options.globalCameoBuildConfig.phonegap.version,
            'currentAppId': options.globalCameoBuildConfig.phonegap.bundleId,
            'logLevel': options.globalCameoBuildConfig.config.logLevel || 'DEBUG',
            'appProtocol': options.globalCameoBuildConfig.static.appProtocol,
            'androidDebuggable': options.globalCameoBuildConfig.phonegap.androidDebuggable || "false",
            'wwwPath': isLocal ? 'www/' : '',
            'plugins': genPluginsForXML(isLocal),
            'phonegapConfig': options.globalCameoPhonegapConfig.build
        }
    }

    function genPluginsForXML(){
        /*
         <gap:plugin name="" version="">
            inner
         </gap:plugin>
        */
        var plugins = options.globalCameoPhonegapConfig.plugins,
            xml = '';

        plugins.forEach(function(plugin){
            xml += '<gap:plugin name="' + plugin.name + '" version="' + plugin.version + '">';
            if ('inner' in plugin)
                xml += plugin.inner;
            xml += '</gap:plugin>';
        });

        return xml;
    }

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
                'phonegap-index-html': {
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
                'phonegap-config-xml': {
                    'options': {
                        'data': configXMLData()
                    },
                    'files': {
                        'build/phonegap/www/config.xml': ['resource/phonegap/config.xml']
                    }
                },
                'phonegap-config-xml-local': {
                    'options': {
                        'data': configXMLData(true)
                    },
                    'files': {
                        'build/phonegap/www/config.xml': ['resource/phonegap/config.xml']
                    }
                },
                'phonegap-config-js': {
                    'options': {
                        'data': {
                            'googleSenderId': options.globalCameoSecrets.google.senderId
                        }
                    },
                    'files': {
                        'build/phonegap/www/config.js': ['resource/phonegap/config.js']
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