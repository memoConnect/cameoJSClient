module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-sloc');

    //https://www.npmjs.org/package/grunt-sloc
    grunt.registerTask('utils:code-coverage', [
        'sloc:app'
    ]);
    grunt.registerTask('utils:count-lines', [
        'sloc'
    ]);

    return {
        tasks:{
            sloc: {
                'app': {
                    files: {
                        lib: ['app/cameo.'+options.globalCameoBuildConfig.config.version+'.js'],
                        vendor: ['app/vendor.'+options.globalCameoBuildConfig.config.version+'.js'],
                        css: ['app/style.'+options.globalCameoBuildConfig.config.version+'.css']
                    }
                }
            }
        }
    }
};