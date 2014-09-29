module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:create-webworker', [
        'clean:app-webworker',
        'template:app-webworker'
    ]);

    return {
        tasks:{
            clean: {
                'app-webworker': ['app/webworker']
            },
            template: {
                'app-webworker': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version
                        }
                    },
                    'files': {
                        'app/webworker/keygen.js': [
                            'resource/templates/webworker/keygen.js'
                        ]
                    }
                }
            }
        }
    }
};