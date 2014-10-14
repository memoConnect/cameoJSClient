module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('watcher', [
        'app:gen-all-templates',
        'app:js-files',
        'watch:app']);

    return {
        tasks:{
            watch: {
                app:{
                    files: [
                        'config/*.json',
                        'app/less/*.less',
                        'app/base/app.js',
                        'resource/templates/**/*',
                        'app/comps/**/*',
                        'app/routes/**/*',
                        'app/widgets/**/*',
                        'app/vendor/**/*'
                    ],
                    tasks: [
                        'app:gen-all-templates',
                        'app:js-files'
                    ]
                }
            }
        }
    }
};