module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:gen-all-templates', [
        'template:app-files',
        'template:cockpit-files',// cockpit.js
        'app:create-webworker',// webworker.js
        'phonegap:app-config',// phonegap-to-buildserver.js
        'protractor:config',// protractor.js
        'app:create-style-via-less',// less.js
        'app:packages'//packages.js
    ]);

    grunt.registerTask('app:deploy-without-template', [
        'clean:app-dist',
        'copy:app-files'
    ]);

    grunt.registerTask('app:deploy-to-dist', [
        'app:deploy-without-template',
        'template:app-files'
    ]);

    // used by watcher, protractor and karma
    grunt.registerTask('app:to-dist', [
        'app:deploy-without-template',
        'cockpit:deploy-without-template',
        'app:gen-all-templates'
    ]);

    return {
        tasks: {
            clean: {
                'app-dist': [
                    'dist/app/'
                ]
            },
            copy: {
                'app-files': {
                    files: [
                        {
                            expand: true,
                            cwd: 'core/gfx/',
                            src: ['**'],
                            dest: 'dist/app/gfx/'
                        },
                        {
                            expand: true,
                            cwd: 'core/i18n/',
                            src: ['**'],
                            dest: 'dist/app/i18n/'
                        },
                        {
                            expand: true,
                            flatten: true,
                            cwd: 'core/css/fonts/',
                            src: ['**'],
                            dest: 'dist/app/css/fonts/'
                        },
                        {
                            src: 'core/favicon.ico',
                            dest: 'dist/app/favicon.ico'
                        },
                        {
                            expand: true,
                            flatten: false,
                            cwd: 'resource/download/gfx/',
                            src: ['**'],
                            dest: 'dist/app/gfx/'
                        }
                    ]
                }
            },
            template: {
                'app-files': {
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
                            'phonegapFiles': options.globalCameoBuildConfig.debug.weinre ? '<script src="http://' + options.globalCameoBuildConfig.debug.weinreIp + ':8080/target/target-script-min.js#anonymous"></script>' : '',
                            'phonegapOnload': '',
                            'errorOnTodoInI18n': options.globalCameoBuildConfig.config.errorOnTodoInI18n,

                            'static': JSON.stringify(options.globalCameoBuildConfig.static)
                        }
                    },
                    'files': {
                        'dist/app/index.html': ['app/index.html'],
                        'dist/app/icons.html': ['core/icons.html'],
                        'build/app/base/config.js': ['app/base/config.js'],
                        'dist/app/performance.html': ['core/performance.html']
                    }
                }
            }
        }
    }
};