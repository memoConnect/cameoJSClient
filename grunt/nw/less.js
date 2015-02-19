module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('nw:concat-less', [
        'concat:nw-less-files',
        'less:nw-less-to-css'
    ]);

    grunt.registerTask('nw:concat-css', [
        'concat:nw-css'
    ]);

    grunt.registerTask('nw:create-style-via-less', [
        'clean:nw-all-generated-css',
        'nw:concat-less',
        'nw:concat-css'
    ]);

    return {
        tasks:{
            clean: {
                'nw-all-generated-css': [
                    'build/css/'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'nw-less-files': {
                    src: [
                        'core/less/base/*.less',
                        'core/less/!(base|_old)/**/*.less',
                        'core/less/theme-base.less',
                        'core/less/!(theme-base).less',
                        'desktop/less/**/*.less'
                    ],
                    dest: 'build/css/nodeWebkit.less'
                },
                'nw-css': {
                    src: [
                        'core/css/normalize.css',
                        'build/css/nodeWebkit.css',
                        'core/css/cameofont.css',
                        'core/vendor/**/*.css'
                    ],
                    dest: 'dist/nodeWebkit/style.' + options.globalCameoBuildConfig.config.version + '.css'
                }
            },
            less: {
                'nw-less-to-css': {
                    options: {
                        yuicompress: true
                    },
                    files: {
                        'build/css/nodeWebkit.css': 'build/css/nodeWebkit.less'
                    }
                }
            }
        }
    }
};