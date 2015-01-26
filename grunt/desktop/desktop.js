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
                            src: 'core/favicon.ico',
                            dest: 'dist/desktop/favicon.ico'
                        },
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
                            cwd: 'core/performance/',
                            src: ['**'],
                            dest: 'dist/desktop/performance/'
                        },
                        {
                            expand: true,
                            flatten: true,
                            cwd: 'core/css/fonts/',
                            src: ['**'],
                            dest: 'dist/desktop/css/fonts'
                        },
                        {
                            expand: true,
                            flatten: false,
                            cwd: 'resource/download/gfx/',
                            src: ['**'],
                            dest: 'dist/desktop/gfx/'
                        }
                    ]
                }
            },
            template: {
                'desktop-files': {
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
                            'errorOnTodoInI18n': options.globalCameoBuildConfig.config.errorOnTodoInI18n,

                            'static': JSON.stringify(options.globalCameoBuildConfig.static)
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