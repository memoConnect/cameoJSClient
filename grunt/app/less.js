module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('app:concat-less', [
        'concat:app-less-files',
        'less:app-less-to-css'
    ]);

    grunt.registerTask('app:concat-css', [
        'concat:app-css'
    ]);

    grunt.registerTask('app:create-style-via-less', [
        'clean:app-all-generated-css',
        'app:concat-less',
        'app:concat-css'
    ]);

    return {
        tasks:{
            clean: {
                'app-all-generated-css': [
                    'dist/css/',
                    'build/css/',
                    'app/css/style*.css',
                    'app/css/app.css',
                    'app/css/app.less',
                    'app/style*.css'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'app-less-files': {
                    src: [
                        'core/less/base/*.less',
                        'core/less/!(base|_old)/**/*.less',
                        'core/less/theme-base.less',
                        'core/less/!(theme-base).less',
                        'app/less/**/*.less'
                    ],
                    dest: 'build/css/app.less'
                },
                'app-css': {
                    src: [
                        'core/css/normalize.css',
                        'build/css/app.css',
                        'core/css/cameofont.css',
                        'core/vendor/**/*.css'
                    ],
                    dest: 'dist/app/style.' + options.globalCameoBuildConfig.config.version + '.css'
                }
            },
            less: {
                'app-less-to-css': {
                    options: {
                        yuicompress: true
                    },
                    files: {
                        'build/css/app.css': 'build/css/app.less'
                    }
                }
            }
        }
    }
};