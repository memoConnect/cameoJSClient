module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:create-webworker', [
        'clean:app-webworker',
        'template:app-webworker'
    ]);


    var webworker   =   ['-mock-vendor', 'keygen', 'rsa_decrypt'],
        files       =   webworker.map(function(job_name){
                            console.log(job_name)
                            var path    = 'app/webworker/'+job_name+'.js',
                                object  = {}

                            object[path] =  [
                                                'resource/templates/webworker/'+job_name+'.js'
                                            ]
                            return object
                        })




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
                    'files': files
                }                
            }
        }
    }
};