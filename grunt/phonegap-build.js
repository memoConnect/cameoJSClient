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

    grunt.registerTask('phonegap:build-all', [
        'phonegap:app-prepare',
        'phonegap-build:app-upload-zip',
        'crosswalk:build-step',
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

    grunt.registerTask('phonegap:app-config-local-crosswalk', [
        'template:phonegap-config-xml-local',
        'template:phonegap-config-js-crosswalk'
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
            'androidDebuggable': options.globalCameoBuildConfig.phonegap.androidDebuggable || "false",
            'plugins': genPluginsForXML(),
            'resources': genResourcesForXML(isLocal),
            'phonegapConfig': options.globalCameoPhonegapConfig.build
        }
    }

    function genPluginsForXML(){
        var plugins = options.globalCameoPhonegapConfig.plugins,
            xml = '';

        plugins.forEach(function(plugin){
            xml += '<gap:plugin name="' + plugin.name + '" version="' + plugin.version + '">';
            if ('inner' in plugin){
                xml += grunt.template.process(plugin.inner, {
                    data:{
                        'appProtocol': options.globalCameoBuildConfig.static.appProtocol
                    }
                });
            }
            xml += '</gap:plugin>\n';
        });

        return xml;
    }

    function genResourcesForXML(isLocal){
        var resources = options.globalCameoPhonegapConfig.resources,
            xml = '';

        resources.forEach(function(resource){
            if(resource.platform != 'default' && isLocal)
                xml+= '<platform name="'+resource.platform+'">\n';

            resource.icons.forEach(function(icon){
                var resourceXml = [];

                resourceXml.push('<icon');
                if(!isLocal && resource.platform != 'default')
                    resourceXml.push('gap:platform="'+resource.platform+'"');

                if(resource.platform != 'default')
                    resourceXml.push('src="'+(isLocal ? 'www/' : '')+'res/icons/'+resource.platform+'/'+icon.src+'"');
                else
                    resourceXml.push('src="'+(isLocal ? 'www/' : '')+'res/icons/'+icon.src+'"');

                if('qualifier' in icon)
                    resourceXml.push('gap:qualifier="'+icon.qualifier+'"');

                if('density' in icon)
                    resourceXml.push('density="'+icon.density+'"');

                if('dim' in icon) {
                    var dimensions = icon.dim.split('x');
                    resourceXml.push('width="' + dimensions[0] + '"');
                    resourceXml.push('height="' + dimensions[1] + '"');
                }

                if('role' in icon)
                    resourceXml.push('gap:role="'+icon.role+'"');

                resourceXml.push('/>\n');

                xml+= resourceXml.join(' ');
            });

            resource.screens.forEach(function(screen){
                var resourceXml = [];

                if(!isLocal) {
                    resourceXml.push('<gap:splash');
                    if(resource.platform != 'default')
                        resourceXml.push('gap:platform="' + resource.platform + '"');
                } else {
                    resourceXml.push('<splash');
                }

                if(resource.platform != 'default')
                    resourceXml.push('src="'+(isLocal ? 'www/' : '')+'res/screens/'+resource.platform+'/'+screen.src+'"');
                else
                    resourceXml.push('src="'+(isLocal ? 'www/' : '')+'res/screens/'+screen.src+'"');

                if('qualifier' in screen)
                    resourceXml.push('gap:qualifier="'+screen.qualifier+'"');

                if('density' in screen)
                    resourceXml.push('density="'+screen.density+'"');

                if('dim' in screen) {
                    var dimensions = screen.dim.split('x');
                    resourceXml.push('width="' + dimensions[0] + '"');
                    resourceXml.push('height="' + dimensions[1] + '"');
                }

                resourceXml.push('/>\n');

                xml+= resourceXml.join(' ');
            });

            if(resource.platform != 'default' && isLocal)
                xml+= '</platform>\n';
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
                            'googleSenderId': options.globalCameoSecrets.google.senderId,
                            'isCrosswalk': false
                        }
                    },
                    'files': {
                        'build/phonegap/www/config.js': ['resource/phonegap/config.js']
                    }
                },
                'phonegap-config-js-crosswalk': {
                    'options': {
                        'data': {
                            'googleSenderId': options.globalCameoSecrets.google.senderId,
                            'isCrosswalk': true
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