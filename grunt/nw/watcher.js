module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('nw:watcher', [
        'nw:create-dist',
        'watch:nw-desktop'
    ]);

    return {
        tasks:{
            watch: {
                'nw-desktop': {
                    files: [
                        'config/*.json',
                        'resource/templates/nodeWebkit/*',
                        'resource/nodeWebkit/**/*',
                        'desktop/**/*',
                        'core/**/*'
                    ],
                    tasks: [
                        'nw:create-dist'
                    ]
                }
            }
        }
    }
};