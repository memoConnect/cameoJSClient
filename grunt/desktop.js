module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('app:copy-core', [
        'clean:desktop-dist',
        'copy:desktop-core'
    ]);

    return {
        tasks: {
            clean: {
                'desktop-dist': [
                    'dist/desktop/'
                ]
            },
            copy: {
                'desktop-core': {
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
            }
        }
    }
}