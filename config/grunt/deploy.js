module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('app:deploy', [
        'clean:dist',
        'app:gen-all-templates',
        'app:js-files',
        'copy:app-deploy',
        'clean:app-unused-files',
        'uglify:app-deploy',
        'cssmin:app-deploy',
        'copy:cockpit',
        'uglify:cockpit'
    ]);

    return {
        tasks:{
            clean: {
                'dist': ['dist'],
                'app-unused-files': [
                    'dist/app/comps',
                    'dist/app/less',
                    'dist/app/routes',
                    'dist/app/vendor',
                    'dist/app/widgets',
                    'dist/app/css/*.css'
                ]
            },
            copy: {
                'app-deploy': {
                    files: [
                        {
                            expand: true,
                            src: [
                                'app/**',
                                '!**/*.less'
                            ],
                            dest: 'dist/'
                        }
                    ]
                },
                cockpit: {
                    files: [
                        {
                            expand: true,
                            src: 'cockpit/**',
                            dest: 'dist/'
                        }
                    ]
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                'app-deploy': {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/app',
                            src: 'base/*.js',
                            dest: 'dist/app'
                        },
                        {
                            expand: true,
                            cwd: 'dist/app',
                            src: '*.js',
                            dest: 'dist/app'
                        }
                    ]
                },
                cockpit: {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/cockpit',
                            src: '**/*.js',
                            dest: 'dist/cockpit'
                        }
                    ]
                }
            },
            cssmin: {
                'app-deploy': {
                    expand: true,
                    cwd: 'dist/app',
                    src: '*.css',
                    dest: 'dist/app'
                }
            }
        }
    }
};