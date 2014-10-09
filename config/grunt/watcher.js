module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('watcher', [
        'app:gen-all-templates',
        'app:js-files',
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
                        'resource/templates/**/*'
                    ],
                    tasks: [
                        'app:gen-all-templates',
                        'app:js-files'
                    ]
                },
                'app-css':{
                    files: [
                        'app/less/!(_old)/**/*.less',
                        'app/less/*.less'
                    ],
                    tasks: [
                        'app:create-style-via-less'
                    ]
                },
                'app-js':{
                    files: [
                        'app/base/app.js',
                        'app/comps/**/*',
                        'app/routes/**/*',
                        'app/widgets/**/*',
                        'app/vendor/**/*'
                    ],
                    tasks: [
                        'app:js-files'
                    ]
                }
            }
        }
    }
};