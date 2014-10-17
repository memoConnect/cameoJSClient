module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('app:create-webworker', [
        'clean:app-webworker',
        'template:app-webworker',
        'copy:app-webworker-mock-vendor'
    ]);


    var webworker   =   [
                            'rsa_keygen', 
                            'rsa_decrypt', 
                            'rsa_encrypt',
                            'rsa_sign',
                            'rsa_verify'
                        ],
        files       =   webworker.map(function(job_name){
                            var path    = 'dist/app/webworker/'+job_name+'.js',
                                object  = {}

                            object[path] =  [
                                                'core/webworker/'+job_name+'.js'
                                            ]
                            return object
                        })


    return {
        tasks:{
            clean: {
                'app-webworker': ['dist/app/webworker']
            },

            copy: {
                'app-webworker-mock-vendor': {
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: ['core/webworker/-mock-vendor.js'],
                            dest: 'dist/app/webworker/'
                        }
                    ]
                }
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