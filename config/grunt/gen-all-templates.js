module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:gen-all-templates', [
        'protractor:e2e:config',// protractor.js
        'template:app-config',
        'template:app-index',
        'app:create-webworker',// webworker.js
        'phonegap:app-config',// phonegap-to-buildserver.js
        'protractor:config',// protractor.js
        'app:create-style-via-less'// less.js
    ]);

    return {
        tasks:{
            copy: {
                'test-config': {
                    files: [
                        {
                            src: 'config/cameoBuildConfig-test.json',
                            dest: 'config/cameoBuildConfig-jenkins.json'
                        }
                    ]
                }
            },

            template: {
                'app-index': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'phonegapFiles': options.globalCameoBuildConfig.debug.weinre ? '<script src="http://' + options.globalCameoBuildConfig.debug.weinreIp + ':8080/target/target-script-min.js#anonymous"></script>' : '',
                            'phonegapOnload': ''
                        }
                    },
                    'files': {
                        'app/index.html': ['resource/templates/app/index.html']
                    }
                },
                'app-config': {
                    'options': {
                        'data': {
                            'currentApiUrl': options.globalCameoBuildConfig.config.apiUrl,
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'autoLogin': options.globalCameoBuildConfig.config.autoLogin,
                            'loadingBar': options.globalCameoBuildConfig.config.loadingBar,
                            'enableDebug': options.globalCameoBuildConfig.config.enableDebug
                        }
                    },
                    'files': {
                        'app/base/config.js': ['resource/templates/app/config.js']
                    }
                }
            }
        }
    }
};