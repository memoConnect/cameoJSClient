module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('app:deploy', [
        'app:deploy-without-template',
        'app:gen-all-templates',

        'cockpit:deploy-without-template',

        'uglify:app-deploy',
        'cssmin:app-deploy',
        'uglify:cockpit-deploy'
    ]);

    return {
        tasks:{
            uglify: {
                options: {
                    mangle: false
                },
                'app-deploy': {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/app',
                            src: '**/*.js',
                            dest: 'dist/app'
                        }
                    ]
                },
                'cockpit-deploy': {
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