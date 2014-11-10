module.exports = function(grunt, options) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('desktop:gen-all-templates', [
        'template:desktop-files',
        'desktop:create-webworker',// webworker.js
        'protractor:config',// protractor.js
        'desktop:create-style-via-less',// less.js
        'desktop:packages'//packages.js
    ]);

    grunt.registerTask('desktop:deploy-without-template', [
        'clean:desktop-dist',
        'copy:desktop-files'
    ]);

    grunt.registerTask('desktop:deploy-to-dist', [
        'desktop:deploy-without-template',
        'template:desktop-files'
    ]);

    return {
        tasks: {
            clean: {
                'desktop-dist': [
                    'dist/desktop/'
                ]
            },
            copy: {
                'desktop-files': {
                    files: [
                        {
                            expand: true,
                            cwd: 'core/gfx/',
                            src: ['**'],
                            dest: 'dist/desktop/gfx/'
                        },
                        {
                            expand: true,
                            cwd: 'core/i18n/',
                            src: ['**'],
                            dest: 'dist/desktop/i18n/'
                        },
                        {
                            expand: true,
                            flatten: true,
                            cwd: 'core/css/fonts/',
                            src: ['**'],
                            dest: 'dist/desktop/css/fonts'
                        },
                        {
                            src: 'core/favicon.ico',
                            dest: 'dist/desktop/favicon.ico'
                        }
                    ]
                }
            },
            template: {
                'desktop-files': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'currentApiUrl': options.globalCameoBuildConfig.config.apiUrl,
                            'autoLogin': options.globalCameoBuildConfig.config.autoLogin,
                            'loadingBar': options.globalCameoBuildConfig.config.loadingBar,
                            'enableDebug': options.globalCameoBuildConfig.config.enableDebug,
                            'performancePage': options.globalCameoBuildConfig.config.performancePage,
                            'appProtocol': options.globalCameoBuildConfig.static.appProtocol,
                            'appLinks': JSON.stringify(options.globalCameoBuildConfig.static.appLinks)
                        }
                    },
                    'files': {
                        'dist/desktop/index.html': ['desktop/index.html'],
                        'dist/desktop/icons.html': ['core/icons.html'],
                        'build/desktop/base/config.js': ['desktop/base/config.js'],
                        'dist/desktop/performance.html': ['core/performance.html']
                    }
                }
            }
        }
    }
};