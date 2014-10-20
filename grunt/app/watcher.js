module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('app:watcher', [
        'app:deploy-without-template',
        'cockpit:deploy-without-template',

        'app:gen-all-templates',

        'concurrent:app'
    ]);

    return {
        tasks:{
            concurrent: {
                options: {
                    logConcurrentOutput: true
                },
                app: {
                    tasks: [
                        'watch:app-other',
                        'watch:app-css',
                        'watch:app-js'
                    ]
                }
            },
            watch: {
                'app-other':{
                    files: [
                        'config/*.json',
                        'resource/templates/**/*',
                        'app/**/*.html'
                    ],
                    tasks: [
                        'app:gen-all-templates'
                    ]
                },
                'app-css':{
                    files: [
                        'core/less/!(_old)/**/*.less',
                        'core/less/*.less'
                    ],
                    tasks: [
                        'app:create-style-via-less'
                    ]
                },
                'app-js':{
                    files: [
                        'app/base/app.js',
                        'core/comps/**/*',
                        'app/routes/**/*',
                        'core/widgets/**/*',
                        'core/vendor/**/*'
                    ],
                    tasks: [
                        'app:packages'
                    ]
                }
            }
        }
    }
};