module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('desktop:create-webworker', [
        'clean:desktop-webworker',
        'template:desktop-webworker',
        'copy:desktop-webworker-mock-vendor'
    ]);


    var webworker   =   [
                            'rsa_keygen', 
                            'rsa_decrypt', 
                            'rsa_encrypt',
                            'rsa_sign',
                            'rsa_verify'
                        ],
        files       =   webworker.map(function(job_name){
                            var path    = 'dist/desktop/webworker/'+job_name+'.js',
                                object  = {}

                            object[path] =  [
                                                'core/webworker/'+job_name+'.js'
                                            ]
                            return object
                        })


    return {
        tasks:{
            clean: {
                'desktop-webworker': ['dist/desktop/webworker']
            },

            copy: {
                'desktop-webworker-mock-vendor': {
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: ['core/webworker/-mock-vendor.js'],
                            dest: 'dist/desktop/webworker/'
                        }
                    ]
                }
            },
            template: {
                'desktop-webworker': {
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