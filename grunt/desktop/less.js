module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('desktop:concat-less', [
        'concat:desktop-less-files',
        'less:desktop-less-to-css'
    ]);

    grunt.registerTask('desktop:concat-css', [
        'concat:desktop-css'
    ]);

    grunt.registerTask('desktop:create-style-via-less', [
        'clean:desktop-all-generated-css',
        'desktop:concat-less',
        'desktop:concat-css'
    ]);

    return {
        tasks:{
            clean: {
                'desktop-all-generated-css': [
                    'build/css/'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'desktop-less-files': {
                    src: [
                        'core/less/base/*.less',
                        'core/less/!(base|_old)/**/*.less',
                        'core/less/theme-base.less',
                        'core/less/!(theme-base).less',
                        'desktop/less/**/*.less'
                    ],
                    dest: 'build/css/desktop.less'
                },
                'desktop-css': {
                    src: [
                        'core/css/normalize.css',
                        'build/css/desktop.css',
                        'core/css/cameofont.css',
                        'core/vendor/**/*.css'
                    ],
                    dest: 'dist/desktop/style.' + options.globalCameoBuildConfig.config.version + '.css'
                }
            },
            less: {
                'desktop-less-to-css': {
                    options: {
                        yuicompress: true
                    },
                    files: {
                        'build/css/desktop.css': 'build/css/desktop.less'
                    }
                }
            }
        }
    }
};