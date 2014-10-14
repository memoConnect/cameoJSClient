module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:gen-all-templates', [
        'protractor:e2e:config',// protractor.js
        'template:app-files',
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
                'app-files': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'currentApiUrl': options.globalCameoBuildConfig.config.apiUrl,
                            'autoLogin': options.globalCameoBuildConfig.config.autoLogin,
                            'loadingBar': options.globalCameoBuildConfig.config.loadingBar,
                            'enableDebug': options.globalCameoBuildConfig.config.enableDebug,
                            'performancePage': options.globalCameoBuildConfig.config.performancePage,
                            'phonegapFiles': options.globalCameoBuildConfig.debug.weinre ? '<script src="http://' + options.globalCameoBuildConfig.debug.weinreIp + ':8080/target/target-script-min.js#anonymous"></script>' : '',
                            'phonegapOnload': ''
                        }
                    },
                    'files': {
                        'app/index.html': ['resource/templates/app/index.html'],
                        'app/icons.html': ['resource/templates/app/icons.html'],
                        'app/base/config.js': ['resource/templates/app/config.js'],
                        // performance page
                        'app/performance.html': ['resource/templates/app/performance.html']
                    }
                }
            }
        }
    }
};