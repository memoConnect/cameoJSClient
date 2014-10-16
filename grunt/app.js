module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('app:copy-core', [
        'clean:app-dist',
        'copy:app-core'
    ]);

    return {
        tasks: {
            clean: {
                'app-dist': [
                    'dist/app/'
                ]
            },
            copy: {
                'app-core': {
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
                            dest: 'dist/app/css/fonts'
                        },
                        {
                            src: 'core/favicon.ico',
                            dest: 'dist/app/favicon.ico'
                        }
                    ]
                }
            }
        }
    }
}