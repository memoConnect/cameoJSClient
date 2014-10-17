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
        'clean:all-generated-css',
        'app:concat-less',
        'app:concat-css'
    ]);

    return {
        tasks:{
            clean: {
                'all-generated-css': [
                    'dist/css/',
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
                        'app/less/base.less',
                        'app/less/bootstrap.less',
                        'app/less/theme-a.less',
                        'app/less/!(base|bootstrap|theme-a).less'
                    ],
                    dest: 'dist/css/app.less'
                },
                'app-css': {
                    src: [
                        'app/css/bootstrap.min.css',
                        'dist/css/app.css',
                        'app/css/cameofont.css',
                        'app/vendor/**/*.css'
                    ],
                    dest: 'app/style.' + options.globalCameoBuildConfig.config.version + '.css'
                }
            },
            less: {
                'app-less-to-css': {
                    options: {
                        yuicompress: true
                    },
                    files: {
                        'dist/css/app.css': 'dist/css/app.less'
                    }
                }
            }
        }
    }
};