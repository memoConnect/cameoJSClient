module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-appdmg');

    grunt.registerTask('app:deploy', [
        'app:deploy-without-template',
        'app:gen-all-templates',

        'cockpit:deploy-without-template',

        'desktop:deploy-without-template',
        'desktop:gen-all-templates',
        'optional-uglify',
        'cssmin:app-deploy'
    ]);

    grunt.registerTask('optional-uglify', function(){
        if (! options.globalCameoBuildConfig.config.disableUglify) {
            grunt.task.run('uglify:app-deploy')
        }
    })

    return {
        tasks: {
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
                        },
                        {
                            expand: true,
                            cwd: 'dist/cockpit',
                            src: '**/*.js',
                            dest: 'dist/cockpit'
                        },
                        {
                            expand: true,
                            cwd: 'dist/desktop',
                            src: '**/*.js',
                            dest: 'dist/desktop'
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